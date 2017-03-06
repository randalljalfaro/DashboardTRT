var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ObjectIdConst = require('mongoose').Types.ObjectId; 

var PropertySchema = mongoose.Schema({
	name: {
		type: String,
		unique : true,
		required : true
	},
	type: {
		type: String,
		required : true
	},
	channels:[{ type: ObjectId, ref: 'Channel' }],
	data : [{ type: ObjectId, ref: 'PropertyData' }]
});
var Property = module.exports = mongoose.model('Property', PropertySchema);

module.exports.updatePropertyData = function (propertyId, channelId, year, months, callback){
	/*
	'data.years.year' : Number(year)*/
	Property.aggregate(
		[
		{
			$match:{
				_id : new ObjectIdConst(propertyId)
			}
		},
		{
			'data':1
		}],
		function(error, property){
			//callback(property);
			if(!error){
				var years = [];
				for(var i in property.data){
					var channel = property.data[i];
					for(var j in channel.years){
						var yearData = channel.years[j];
						if(yearData.year==year){
							yearData.months = months;
						}
					}
				}
				Property.update(
				{
					'data.channel' : new ObjectIdConst(channelId)
				},
				{
					$set: {
						'data.$.channel.years' : years
					}
				},
				callback
				);

			}
		});
}


/*Property.update(
{
	_id : new ObjectIdConst(propertyId),
	'data.channel' : new ObjectIdConst(channelId)
},
{ 
	$set: { 
		'data.$.years' : years
	}
},
function(result){
	console.log({
		_id : new ObjectIdConst(propertyId),
		'data.channel' : new ObjectIdConst(channelId),
		'data.years.year' : year
	});
	callback(result);
});*/

module.exports.findPropertyData = function(
	propertyId, channels, fromMonth, fromYear, toMonth, toYear, callback){
	var channelsQuery = [];
	for (var i = 0; i<channels.length; i++) {
		channelsQuery.push(new ObjectIdConst(channels[i]));
	}
	/*
	console.log("****************************");
	console.log(propertyId);
	console.log(channels);
	console.log(fromMonth);
	console.log(fromYear);
	console.log(toMonth);
	console.log(toYear);
	*/

	//Revisar la validez del rango
	if(fromYear==toYear)
		query([fromYear], fromMonth, toMonth, callback);
	else
		query([fromYear], fromMonth, 11, function (err, property_data_from) {
			//console.log(JSON.stringify(property_data_from, null, 2));
			query([toYear], 0, toMonth, function (err2, property_data_to) {
				if((toYear-fromYear)>0){
					var years=[];
					for (var year = fromYear+1; year < toYear; year++) {
						years.push(year);
					}
					query(years, 0, 11, function (err3, property_data_mid) {
						joinData(property_data_from, property_data_mid, property_data_to, callback, err, err2, err3);
					});
				}
				else
					joinData(property_data_from, null,  property_data_to, callback, err, err2, null);
				
			});
		});


	function joinData(property_data_from, property_data_mid, property_data_to, cb, err, err2, err3){
		var property_data_total = [];

		if(err) return cb(err);
		else if(err2) return cb(err2);
		else if(err3) return cb(err3);

		//Se inserta los meses iniciales
		//console.log(JSON.stringify(property_data_from, null, 2));
		if(property_data_from.length>0){
			for(var i=0; i<property_data_from.length; i++){
				property_data_total.push(property_data_from[i]);
			}
		}

		//Se inserta los meses del medio, si es que los hay
		//console.log(JSON.stringify(property_data_mid, null, 2));
		if(property_data_mid!=null){
			for(var i=0; i<property_data_mid.length; i++){
				property_data_total.push(property_data_mid[i]);
			}
		}

		//Se inserta los meses finales
		//console.log(JSON.stringify(property_data_to, null, 2));
		if(property_data_to.length>0){
			for(var i=0; i<property_data_to.length; i++){
				property_data_total.push(property_data_to[i]);
			}
		}

		cb(null,property_data_total);

	}

	function query(years, gte, lte, cb){
		Property.aggregate([
		{ 
			$project : {
				data : 1
			}
		},
		{
			$match: {
				_id : new ObjectIdConst(propertyId)
			}
		},
		{ 
			$unwind: { 
				path: "$data"
			} 
		},
		{
			$match: {
				"data.channel" :  {
					$in : channelsQuery
				}
			}
		},
		{ 
			$unwind: { 
				path: "$data.years"
			} 
		},
		{
			$match: {
				"data.years.year" : {
					$in : years
				}
			}
		},
		{ 
			$unwind: { 
				path: "$data.years.months"
			} 
		},
		{
			$match: {
				"data.years.months.number" : {
					"$gte":gte,
					"$lte":lte
				}
			}
		},
		{ 
			$sort : { 
				"data.years.months.number" : 1
			} 
		},
		{
			$group:{
				_id: {
					channel:"$data.channel",
					year: "$data.years.year"
				},

				months: { 
					$push: "$data.years.months"
				}
			}
		},
		{ 
			$sort : { 
				"_id.year" : 1
			} 
		}
		], cb);
	}
}
