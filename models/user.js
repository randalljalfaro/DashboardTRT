var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var ObjectIdConst = require('mongoose').Types.ObjectId; 

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true,
		required : true
	},
	roles:[
	{
		type: {
			type: String,
			required : true
		},
		sections:[String]
	}
	],
	password: {
		type: String,
		required : true
	},
	email: {
		type: String,
		unique : true,
		required : true
	},
	complete_name: {
		type: String,
		required : true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			//console.log("createUser"+ newUser);
			newUser.save(callback);
		});
	});
}

module.exports.updatePassword = function(data, callback){
	//Comparar la contraseña antigua
	//Comparar la nueva contraseña con su confirmación
	//Guardar el hash de la nueva contraseña
	var query = {_id: data.user};
	//console.log(JSON.stringify(data));
	if(data.new!=data.new2){
		return callback(null, {errors:[{msg:"Nueva contraseña no coincide con la confirmación."}]});
	}
	User.findOne(query, function(err, user){
		if(err) return callback(err);
		User.comparePassword(
			data.old, user.password,
			function(err, isMatch){
				if(!isMatch){
					return callback(null, {errors:[{msg:"Contraseña incorrecta."}]});
				}else{
					bcrypt.genSalt(10, function(err, salt) {
						bcrypt.hash(data.new, salt, function(err, hash) {
							User.update(query, {password:hash}, function(){
								return callback(null, {result:true});
							});
						});
					});
				}
			});
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, realPasswordHash, callback){
	bcrypt.compare(candidatePassword, realPasswordHash, function(err, isMatch) {
		if(err) {
			console.log("Error al usar bcrypt y comparar las claves.");
			console.log(err);
		} 
		callback(err, isMatch);
	});
}

module.exports.getRoleSections = function(id, roleType, callback){
	User.findOne({_id : id}, {roles:1},function(err, user) {
		for(var indexR in user.roles){
			if(user.roles[indexR].type=='admin'){
				return callback(true);
			}
		}
		var sectionsIds = [];
		for(var indexR in user.roles){
			if(user.roles[indexR].type == roleType){
				var sections = user.roles[indexR].sections;
				for(var i = 0; i < sections.length; i++){
					sectionsIds.push(new ObjectIdConst(sections[i]));
				}
			}
			return callback(sectionsIds);
		}
		return callback(false);
	});
}