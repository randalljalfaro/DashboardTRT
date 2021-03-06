var express = require('express');
var router = express.Router();
var Channel = require('../models/channel');
var Property = require('../models/property');
var Channel = require('../models/channel');
var PropertyData = require('../models/propertyData');
var authManager = require('../util/authenticationManager');
var responseManager = require('../util/responseManager');

router.post('/get', authManager.ensureAuthenticated, function(req, res){
	var fromMonth = Number(req.body.fromMonth);
	var fromYear = Number(req.body.fromYear);
	var toMonth = Number(req.body.toMonth);
	var toYear = Number(req.body.toYear);
	var propertyId = req.body.propertyId;
	var properties = req.body.properties;
	var channels = req.body.channels;
	
	/*var fromMonth = 0;
	var fromYear = 2017;
	var toMonth = 11;
	var toYear = 2019;
	var propertyId = "58a6e7e91ab59f4e0631a9e9";
	var channelId = "sfjkgiushifgusdjkfnj";*/
 
	var errors = null;
	
	if(errors){
		//Error 400: Bad request
		responseManager.errorReponse(res, 400, errors);
	} else {
		PropertyData.findPropertyData(
			properties, channels, fromMonth, fromYear, toMonth, toYear, 
			function (err, property_data) {
				//console.log(JSON.stringify(property_data,null, 2));
				responseManager.checkAndReponse(err, res, property_data);
			});
		
	}
});

router.post('/update', authManager.ensureAuthenticated, function(req, res){
	var property = req.body.property;
	var channel = req.body.channel;
	var year = req.body.year;
	var months = req.body.months;
	console.log("***property***");
	console.log(property);
	
	PropertyData.updateData(property, channel, year, months,
		function(err, property_data){
			responseManager.checkAndReponse(err, res, property_data);
		});
});

module.exports = router;