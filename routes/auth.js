var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authManager = require('../util/authenticationManager');
var responseManager = require('../util/responseManager');

//Controlador de la lógica para el registro
//Por ahora TODOS pueden crear usuarios
router.post('/signup', authManager.ensureAuthenticated, function(req, res){
	var complete_name = req.body.complete_name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var roles = [];
	var rBody = req.body.roles;

	if(rBody){
		for (var role in rBody) {
			var sections = [];
			for (var section in rBody[role]) {
				if(rBody[role][section]==true)
					sections.push(section);
			}
			if(rBody[role]==true || sections.length>0)
				roles.push({
					type: role,
					sections:sections
				});
		}
	}

	//Se validan todos los campos necesarios para el registro
	req.checkBody('complete_name', 'El nombre completo es requerido').notEmpty();
	req.checkBody('username', 'El nombre de usuario es requerido').notEmpty();
	req.checkBody('email', 'El correo electrónico es requerido').notEmpty();
	req.checkBody('email', 'El correo electrónico no es válido').isEmail();
	req.checkBody('roles', 'Los roles son requeridos').notEmpty();
	req.checkBody('password', 'La contraseña es requerida').notEmpty();
	req.checkBody('password2', 'Las contraseñas no concuerdan').equals(req.body.password);

	var errors = req.validationErrors();
	if(roles.length==0){
		errors.push({param:"roles", msg:'Los roles son requeridos'})
	}

	/*console.log("********************************************");
	console.log("Errors: " + JSON.stringify(errors, null, 2));
	console.log("Body: " + JSON.stringify(req.body, null, 2));*/

	if(errors){
		//Error 400: Bad request
		responseManager.errorReponse(res, 400, errors);
	} else {
		//**Falta**
		//Revisar si existe otro usuario con el correo o el username
		var newUser = new User({
			complete_name: complete_name,
			email:email,
			username: username,
			password: password,
			roles : roles
		});

		User.createUser(newUser, function(err, user){
			responseManager.checkAndReponse(err, res, { user: user });
			/*responseManager.checkAndReponse(err, res, {
				token: authManager.createToken(user)
			});*/
		});
	}
});

//Controlador de la lógica para el login
router.post('/login', function(req, res){
	//Buscar por constraseña hasheada
	User.findOne({username: req.body.username}, function(err, user) {
		//**FALTA**
        //Revisar si la contraseña es correcta
        //console.log("*login* -> ("+JSON.stringify(user)+")");
        if(err)
        	responseManager.checkAndReponse(err, res);
        else if(user)
        	responseManager.checkAndReponse(err, res, {
        		token: authManager.createToken(user),
        		user: {
        			username : user.username,
        			complete_name : user.complete_name,
        			email : user.email,
        			roles : user.roles
        		}
        	});
        else
        	responseManager.errorReponse(res, 401, [{msg:"Nombre de usuario y/o contraseña incorrecta"}]);
    });
});

module.exports = router;