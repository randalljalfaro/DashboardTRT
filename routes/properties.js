var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Property = require('../models/property');
var authManager = require('../util/authenticationManager');
var responseManager = require('../util/responseManager');

router.post('/', authManager.ensureAuthenticated, function(req, res){
	var name = req.body.name;
	var type = req.body.type;
	var channels = [];
	if(req.body.channels) {
		for(var channel in req.body.channels){
			if(req.body.channels[channel]==true){
				channels.push(channel);
			}
		}
	}

	req.checkBody('name', 'El nombre es requerido').notEmpty();;
	req.checkBody('type', 'El tipo es requerido').notEmpty();

	var errors = req.validationErrors();
	
	if(errors){
		//Error 400: Bad request
		responseManager.errorReponse(res, 400, errors);
	} else {
		//**Falta**
		//Revisar si existe otro usuario con el correo o el username
		var newProperty = new Property({
			name: name,
			type:type,
			channels: channels,
			data : []
		});

		newProperty.save(function(err, property){
			responseManager.checkAndReponse(err, res, property);
		});
	}
});

router.get('/:type', authManager.ensureAuthenticated, function(req, res){
	User.getRoleSections(req.userId, req.params.type, function(sections) {
		var query = {};
		if(sections==false){
			return responseManager.dataResponse(res, 200, []);
		}
		else if(Array.isArray(sections)){
			query = {
				_id : {
					$in: sections
				}
			}
		}
		Property.find(query).populate('channels').exec(function(err, properties) {
			responseManager.checkAndReponse(err, res, properties);
		});
	});
});

router.delete('/:propertyId', authManager.ensureAuthenticated, function(req, res){
	Property.remove({_id:req.params.propertyId},function(err, property) {
		responseManager.checkAndReponse(err, res);
	});
});


module.exports = router;