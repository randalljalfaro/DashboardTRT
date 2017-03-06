var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authManager = require('../util/authenticationManager');
var responseManager = require('../util/responseManager');

//Todas peticiones solo las debería de poder hacer un admin de la plataforma
router.get('/', authManager.ensureAuthenticated, function(req, res){
	User.find({}, {password:0},function(err, users) {
		responseManager.checkAndReponse(err, res, users);
	});
});

//Todas peticiones solo las debería de poder hacer un admin de la plataforma
router.get('/current', authManager.ensureAuthenticated, function(req, res){
	User.findOne({_id:req.userId}, {password:0},function(err, user) {
		responseManager.checkAndReponse(err, res, user);
	});
});

router.delete('/:userId', authManager.ensureAuthenticated, function(req, res){
	//El usuario "admin" no se debería poder borrar
	User.remove({_id:req.params.userId},function(err, user) {
		responseManager.checkAndReponse(err, res);
	});
});

router.put('/:userId', authManager.ensureAuthenticated, function(req, res){
	//Se deben validar los campos antes de guardar
	console.log("No está implementado");
});

module.exports = router;