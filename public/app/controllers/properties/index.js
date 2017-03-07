app.controller("PropertiesCtrl", ["$scope", "$http", "$location", 'requestHandlers', PropertiesCtrl]);

function PropertiesCtrl($scope, $http, $location, reqHandlers) {
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
				alert("Ha habido un problema al realizar la eliminación de la propiedad");
				alert(JSON.stringify(response));
			}
		},
		get : {
			success : function (response) {
				$scope.properties = response;
			},
			error : function (response) {
				alert("Error al cargar la información de las propiedades");
				alert(JSON.stringify(response));
			}
		}
	}
	refreshProperties();

	function refreshProperties(){
		$scope.actions.get({type:"admin"}, cbs.get.success, cbs.get.error);
	}
}	