module.exports = {  
	TOKEN_SECRET: process.env.TOKEN_SECRET || "!*pfs234e*fdwersfF.sdgl",
	ERR_MSG:{
		//Bad request
		"400": "Petición con errores",
		//Unauthorized
		"401": "Error en el estado o proceso de autenticación",
		//Forbidden
		"403": "Servidor no puede responder la petición",
		//Internal server error
		"500": "Error interno del servidor"
	}
};