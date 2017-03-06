app.controller("AppCtrl", ["$scope", "$auth", "userRoles", AppCtrl]);
app.controller("HomeCtrl", HomeCtrl);

function AppCtrl($scope, $auth, userRoles) {
	$scope.auth = $auth;
	userRoles.cleanCurrentUser();
	userRoles.setCurrentUser();
}

function HomeCtrl($scope) {
	
}


