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
	channels:[{ type: ObjectId, ref: 'Channel' }]
});
var Property = module.exports = mongoose.model('Property', PropertySchema);
