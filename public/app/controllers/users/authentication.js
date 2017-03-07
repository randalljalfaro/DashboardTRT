//Authentication controllers
app.controller("SignUpCtrl", ["$scope", "$auth", "$location",  "requestHandlers", SignUpCtrl]);
app.controller("LoginCtrl", ["$scope", "$auth", "$location", "userRoles", LoginCtrl]);
app.controller("LogoutCtrl",["$auth", "$location", "userRoles", LogoutCtrl]);

function SignUpCtrl($scope, $auth, $location, reqHandlers) {
	var vm = this;
	//Traer por medio de una petición HTTP
	$scope.properties = [];
	reqHandlers.properties.get(
		{type:"admin"},
		function(response){
			$scope.properties = response;
		}, function(){});
	$scope.permissions = permissions[0].types;
	//------------------------------------
	$scope.selectedPermissions = {};
	$scope.errors = null;
	this.signup = function(){
		$auth.signup({
			username: vm.username,
			complete_name: vm.complete_name,
			email: vm.email,
			password: vm.password,
			password2: vm.password2,
			roles: vm.roles
		})
		.then(function() {
			//Cuando hace el signup no se asigna un token porque para esta app
			//solo el admin puede crear usuarios y usario el mismo token que se le
			//entregó cuando se logueó
			$location.path("/users");
		})
		.catch(function(response) {
			$scope.errors = response.data.info;
		});
	}
}

function LoginCtrl($scope, $auth, $location, userRoles) {  
	var vm = this;
	this.login = function(){
		$auth.login({
			username: vm.username,
			password: vm.password
		})
		.then(function(response){
			userRoles.setCurrentUser(response.data.user);
			$auth.setToken(response.data.token);
			$location.path("/home");
		})
		.catch(function(response){
			if(response.data && response.data.info){
				$scope.errors = response.data.info;
			}else{
				$scope.errors = [{msg:"Error al realizar el login, contacte al administrador."}];
			}
			//alert(JSON.stringify(response));
			//$scope.errors = response.data.info;
		});
	}
}

function LogoutCtrl($auth, $location, userRoles) {  
	$auth.logout()
	.then(function() {
		userRoles.cleanCurrentUser();
		$location.path("/auth/login");
	});
}



//**************************************************************************************


var permissions = [
{
	module:"billing_information", 
	types:[
	/*{
		name:"admin",
		label:"Administrador del módulo"
	},*/
	{
		name:"data_admin",
		divided_by:"property",
		label:"Administrador de datos"
	},
	{
		name:"reports",
		divided_by:"property",
		label:"Visualizar reportes"
	}
	]
}
];
