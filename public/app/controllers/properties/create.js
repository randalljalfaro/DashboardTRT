app.controller("PropertyCreateCtrl", ["$scope", "$http", "$location", 'requestHandlers', PropertyCreateCtrl]);

function PropertyCreateCtrl($scope, $http, $location, reqHandlers) {
	$scope.data = {};
	$scope.selectedChannels = {};
	$scope.actions = reqHandlers.properties;
	$scope.channels = [];
	reqHandlers.channels.get(
		function (response){
			$scope.channels = response.data;
		});
	//Pasar los callbacks al requestHandlers
	//Si necesita el $scope se debe realizar algo ingenioso para pasar la referencia
	//	o dejar lña función en la forma local que se encuentra
	var cbs = $scope.callbacks = {
		create : {
			success : function(response){
				$location.path("/properties");
			},
			error : function(response){
				alert("Ha habido un problema al realizar la creación de la propiedad");
				alert(JSON.stringify(response));
			}
		}
	}
}