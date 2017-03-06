var mongoose = require('mongoose');

var ChannelSchema = mongoose.Schema({
	name: {
		type: String,
		unique : true,
		required : true
	},
	link: {
		type: String,
		unique : true,
		required : true
	}
});

var Channel = module.exports = mongoose.model('Channel', ChannelSchema);
