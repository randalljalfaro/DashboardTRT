var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('../config');
var responseManager = require('./responseManager');

exports.createToken = function(user) {
	//console.log("*createToken* -> ("+user._id+")");
	var payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, "days").unix(),
	};
	return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.ensureAuthenticated = function(req, res, next) {  
	if(!req.headers.authorization) {
		return responseManager.errorReponse(
			res, 403, "La petición no tiene cabecera de autorización");
	}

	var token = req.headers.authorization.split(" ")[1];
	var payload = jwt.decode(token, config.TOKEN_SECRET);

	if(payload.exp <= moment().unix()) {
		return responseManager.errorReponse(
			res, 401, "El token ha expirado");
	}
	//console.log("*ensureAuthenticated* -> ("+JSON.stringify(payload)+")");
	req.userId = payload.sub;
	next();
}
