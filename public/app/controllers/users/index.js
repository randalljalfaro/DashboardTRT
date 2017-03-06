app.controller("UsersCtrl", ["$scope", "$http", "$location", 'requestHandlers', UsersCtrl]);

function UsersCtrl($scope, $http, $location, reqHandlers) {
	$scope.selectedPermissions = {};
	$scope.actions = reqHandlers.users;
	reqHandlers.properties.get(
		"admin",
		function(response){
			$scope.properties = {};
			for(var p in response.data){
				var prop = response.data[p];
				$scope.properties[prop._id] = prop;
			}
		}, function(){
			$scope.properties = {};
		});

	/*reqHandlers.properties_data.create(null,
		function(response){
			alert(JSON.stringify(response));
		},
		function(response){
			alert(JSON.stringify(response));
		});*/

	//Pasar los callbacks al requestHandlers
	//Si necesita el $scope se debe realizar algo ingenioso para pasar la referencia
	//	o dejar lña función en la forma local que se encuentra
	var cbs = $scope.callbacks = {
		delete : {
			success : function(response){
				//alert("Eliminición de usario ha sido exitoso");
				//$location.path("/users");
				$scope.actions.get(cbs.get.success, cbs.get.error);
			},
			error : function(response){
				alert("Ha habido un problema al realizar la eliminación del usario");
				alert(JSON.stringify(response));
			}
		},
		get : {
			success : function (response) {
				$scope.users = response.data;
			},
			error : function (response) {
				alert("Error al cargar la información de los usuarios");
				alert(JSON.stringify(response));
			}
		}
	}
	//Debería buscarse dentro de una lista de permisos traida desde el server
	//por ahora están estáticos los permisos
	$scope.getPermissionName = function(type){
		switch(type) {
			case 'admin':
			return 'Administrador de la plataforma';
			case 'data_admin':
			return 'Administrar datos';
			break;
			case 'reports':
			return 'Visualizar reportes';
			default:
			return 'Rol no identificado';
		} 
	}
	$scope.actions.get(cbs.get.success, cbs.get.error);
}
