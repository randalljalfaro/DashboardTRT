var config = require('../config');

var dataResponse = function(res, type, msg){
	console.log({type:type, data:msg});
	return res
	.status(type)
	.send(msg);
}
var errorReponse = function(res, type, info){
	return dataResponse(res, type, {
		msg:config.ERR_MSG[""+type],
		info:info
	});
}
var checkAndReponse = function(error, res, data){
	if(error) {
		//Error 500: Internal server error
		return errorReponse(res, 500, error);
	}
	else return dataResponse(res, 200, data);
}

module.exports = {
	dataResponse : dataResponse,
	errorReponse: errorReponse,
	checkAndReponse : checkAndReponse
}
