var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ObjectIdConst = require('mongoose').Types.ObjectId; 

var PropertyDataSchema = mongoose.Schema({
	channel:{ type: ObjectId, ref: 'Channel' },
	property:{ type: ObjectId, ref: 'Property' },
	years: [
	{
		year : {
			type: Number,
			required : true
		},
		months : [
		{
			number : {
				type: Number,
				required : true
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
	}
	]
	
	]
});

var PropertyData = module.exports = mongoose.model('PropertyData', PropertyDataSchema);