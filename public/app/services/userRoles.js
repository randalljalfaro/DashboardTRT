app.factory('userRoles', ["$rootScope","requestHandlers", function($rootScope, reqHandlers) {
	function setCurrentUser(userData){
		function setRoles(user){
			$rootScope.user = user;
			var rolesType = {};
			for(var indexR in user.roles){
				var role = user.roles[indexR];
				rolesType[role.type] = true;
			}
			$rootScope.user.rolesType = rolesType;
		}
		if(userData)
			setRoles(userData);
		else{
			reqHandlers.users.getCurrent(
				function(response){
					if(response.data){
						setRoles(response.data);
					}
				}, function(){});
		}
	}

	function cleanCurrentUser(){
		$rootScope.user = {
			username : "",
			complete_name : "",
			email : "",
			roles :[]
		}
	}

	return {
		setCurrentUser: setCurrentUser,
		cleanCurrentUser: cleanCurrentUser
	};
}]);