var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Property = require('../models/property');
var authManager = require('../util/authenticationManager');
var responseManager = require('../util/responseManager');

router.post('/', authManager.ensureAuthenticated, function(req, res){
	var name = req.body.name;
	var type = req.body.type;

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
			channels: getChannelsList(req.body.channels)
		});

		newProperty.save(function(err, property){
			responseManager.checkAndReponse(err, res, property);
		});
	}
});

router.post('/get', authManager.ensureAuthenticated, function(req, res){
	User.getRoleSections(req.userId, req.body.type, function(sections) {
		var query = {};
		if(req.body.property && Array.isArray(sections)){
			for(var s in sections){
				if(sections[s] == req.body.property){
					query._id = req.body.property;
				}
			}
		}
		else if(req.body.property && sections){
			query._id = req.body.property;
		}

		else if(sections==false){
			return responseManager.dataResponse(res, 200, []);
		}
		else if(!req.body.property && Array.isArray(sections)){
			query = {
				_id : {
					$in: sections
				}
			}
		}
		console.log("** --> "+JSON.stringify(query,null, 2));
		Property.find(query).populate('channels').exec(function(err, properties) {
			responseManager.checkAndReponse(err, res, properties);
		});
	});
});

router.put('/', authManager.ensureAuthenticated, function(req, res){
	//Validar antes de actualizar
	var propUpdate = {
		name: req.body.name,
		type: req.body.type,
		channels: getChannelsList(req.body.channels)
	};
	Property.update({_id:req.body._id}, propUpdate,
		function(err, property) {
			responseManager.checkAndReponse(err, res);
		});
});

router.delete('/:propertyId', authManager.ensureAuthenticated, function(req, res){
	Property.remove({_id:req.params.propertyId},function(err, property) {
		responseManager.checkAndReponse(err, res);
	});
});

function getChannelsList(channels){
	var channelsList = [];
	for(var channel in channels){
		if(channels[channel]==true){
			channelsList.push(channel);
		}
	}
	return channelsList;
}

module.exports = router;