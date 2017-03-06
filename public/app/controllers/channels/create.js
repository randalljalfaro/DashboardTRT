app.controller("ChannelCreateCtrl", ["$scope", "$http", "$location", 'requestHandlers', ChannelCreateCtrl]);

function ChannelCreateCtrl($scope, $http, $location, reqHandlers) {
	$scope.data = {};
	$scope.actions = reqHandlers.channels;
	//Pasar los callbacks al requestHandlers
	//Si necesita el $scope se debe realizar algo ingenioso para pasar la referencia
	//	o dejar lña función en la forma local que se encuentra
	var cbs = $scope.callbacks = {
		create : {
			success : function(response){
				$location.path("/channels");
			},
			error : function(response){
				alert("Ha habido un problema al realizar la creación del canal");
				alert(JSON.stringify(response));
			}
		}
	}
}