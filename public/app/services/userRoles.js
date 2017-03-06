app.factory('userRoles', ["$rootScope","requestHandlers", function($rootScope, reqHandlers) {
	function setCurrentUser(){
		reqHandlers.users.getCurrent(
			function(response){
				$rootScope.user = response.data;
				var rolesType = {};
				for(var indexR in response.data.roles){
					var role = response.data.roles[indexR];
					rolesType[role.type] = true;
				}
				$rootScope.user.rolesType = rolesType;
			}, function(){});
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