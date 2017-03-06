var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ObjectIdConst = require('mongoose').Types.ObjectId; 

var PropertyDataSchema = mongoose.Schema({
	channel:{ type: ObjectId, ref: 'Channel', required : true},
	property:{ type: ObjectId, ref: 'Property', required : true },
	year : { type: Number, required : true},
	months : [
	{
		number : {
			type: Number,
			required : true,
			unique : true
		},
		bedroom_count : {
			type: Number,
			default : 0
		},
		amount : {
			type: Number,
			default : 0
		}
	}
	]
}, {
	collection: "property_data"
});

var PropertyData = module.exports = mongoose.model('PropertyData', PropertyDataSchema);


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
		PropertyData.aggregate([
		{
			$match: {
				property : new ObjectIdConst(propertyId),
				channel : {
					$in : channelsQuery
				},
				year : {
					$in : years
				}
			}
		},
		{ 
			$unwind: { 
				path: "$months"
			} 
		},
		{
			$match: {
				"months.number" : {
					"$gte":gte,
					"$lte":lte
				}
			}
		},
		{ 
			$sort : { 
				"months.number" : 1
			} 
		},
		{
			$group:{
				_id: {
					channel:"$channel",
					property: "$property",
					year: "$year"
				},

				months: { 
					$push: "$months"
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


module.exports.updateData = function(property, channel, year, months, cb){
	var monthsData = [];
	for(var i in months){
		var m = months[i];
		//validar campos, por ahora se da por sentado que vienen bien
		monthsData.push({
			number : parseInt(m.number),
			bedroom_count : parseInt(m.bedroom_count),
			amount : parseInt(m.amount),
		});
	}
	PropertyData.update({
		property: new ObjectIdConst(property),
		channel: new ObjectIdConst(channel), 
		year: parseInt(year)
	},
	{
		months: monthsData
	}, cb);

}