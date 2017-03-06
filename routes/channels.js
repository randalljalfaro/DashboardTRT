var express = require('express');
var router = express.Router();
var Channel = require('../models/channel');
var authManager = require('../util/authenticationManager');
var responseManager = require('../util/responseManager');

//Controlador de la lógica para el channels
router.post('/', authManager.ensureAuthenticated, function(req, res){
	var name = req.body.name;
	var link = req.body.link;

	//Se validan todos los campos necesarios para el registro
	req.checkBody('name', 'El nombre completo es requerido').notEmpty();
	req.checkBody('link', 'El link es requerido').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		//Error 400: Bad request
		responseManager.errorReponse(res, 400);
	} else {
		//Si no existen errores, se registra el usuario en la base de datos
		var newChannel = new Channel({
			name: name,
			link:link
		});

		newChannel.save(function(err, channel){
			responseManager.checkAndReponse(err, res, channel);
		});
	}
});

router.get('/', authManager.ensureAuthenticated, function(req, res){
	Channel.find({}, function(err, channels) {
		responseManager.checkAndReponse(err, res, channels);
	});
});

router.delete('/:channelId', authManager.ensureAuthenticated, function(req, res){
	//Solo debería de borrar si validó que no hay hoteles con datos de ese canal
	Channel.remove({_id:req.params.channelId},function(err, channel) {
		responseManager.checkAndReponse(err, res);
	});
});


module.exports = router;