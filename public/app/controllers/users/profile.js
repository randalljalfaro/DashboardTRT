app.controller("UserProfileCtrl", 
	["$scope", "$location", "requestHandlers", "$rootScope", 'userRoles',  UserProfileCtrl]);

function UserProfileCtrl($scope, $location, reqHandlers, $rootScope, userRoles) {
	//console.log($rootScope.user);
	reqHandlers.users.getCurrent(
		function(response){
			if(response.data){
				$scope.passwordChangeData = {
					user : response.data._id,
					new:"", new2:"", old:""
				};
			}
		}, function(){});

	$scope.user = $rootScope.user;
	$scope.errors = [];
	function deleteSpaces(str){
		return (""+str).split(" ").join("");
	}
	$scope.changePassword = function(){
		reqHandlers.users.newPassword($scope.passwordChangeData, function(result){
			if(result.errors) {
				$scope.passwordChangeData.old = "";
				$scope.passwordChangeData.new = "";
				$scope.passwordChangeData.new2 = "";
				$scope.errors = result.errors;
			}
			else if(result.result==true) {
				$scope.errors = [];
				$scope.passwordChangeData.old = "";
				$scope.passwordChangeData.new = "";
				$scope.passwordChangeData.new2 = "";
				alert("Su contraseña ha sido cambiada.");
			}
		}, function(result){
			alert("Hubo un problema al cambiar la contraseña, contacte al administrador.");
		});
	}
}



		/*if($scope.passwordChangeData.new!=$scope.passwordChangeData.new2){
			$scope.errors = [{msg:"Nueva contraseña no coincide con la confirmación"}];
		}*/
		/*else if(deleteSpaces(data.new)=="" || deleteSpaces(data.new2)=="" || deleteSpaces(data.old=="")){
			$scope.errors = [{msg:"Debe rellenar todos los campos"}];
		}
		else {*/