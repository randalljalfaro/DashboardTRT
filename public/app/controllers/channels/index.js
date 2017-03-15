app.controller("ChannelsCtrl", ["$scope", "$http", "$location", 'requestHandlers', 'filterService', ChannelsCtrl]);

function ChannelsCtrl($scope, $http, $location, reqHandlers, filterService) {
	$scope.actions = reqHandlers.channels;

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
				alert("Ha habido un problema al realizar la eliminación del canal");
				alert(JSON.stringify(response));
			}
		},
		get : {
			success : function (response) {
				$scope.channels = response.data;
				filterService.pagination($scope, $scope.channels);
			},
			error : function (response) {
				alert("Error al cargar la información de los canales");
				alert(JSON.stringify(response));
			}
		}
	}
	$scope.actions.get(cbs.get.success, cbs.get.error);
}

