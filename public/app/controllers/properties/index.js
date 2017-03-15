app.controller("PropertiesCtrl", ["$scope", "$http", "$location", 'requestHandlers', 'filterService', PropertiesCtrl]);

function PropertiesCtrl($scope, $http, $location, reqHandlers, filterService) {
	$scope.actions = reqHandlers.properties;
	
	//Pasar los callbacks al requestHandlers
	//Si necesita el $scope se debe realizar algo ingenioso para pasar la referencia
	//	o dejar lña función en la forma local que se encuentra
	var cbs = $scope.callbacks = {
		delete : {
			success : function(response){
				//alert("Eliminición de usario ha sido exitoso");
				//$location.path("/users");
				refreshProperties();
			},
			error : function(response){
				alert("Ha habido un problema al realizar la eliminación de la propiedad, contacte al administrador.");
				alert(JSON.stringify(response));
			}
		},
		get : {
			success : function (response) {
				$scope.properties = response;
				filterService.pagination($scope, $scope.properties);
			},
			error : function (response) {
				alert("Error al cargar la información de las propiedades, contacte al administrador.");
				alert(JSON.stringify(response));
			}
		}
	}
	refreshProperties();

	function refreshProperties(){
		$scope.actions.get({type:"admin"}, cbs.get.success, cbs.get.error);
	}
}	