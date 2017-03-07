app.controller("PropertyCreateCtrl", ["$scope", "$http", "$location", "$stateParams", 'requestHandlers', PropertyCreateCtrl]);

function PropertyCreateCtrl($scope, $http, $location, $stateParams, reqHandlers) {
	//alert($stateParams.property);
	$scope.data = {};
	if($stateParams.property){
		reqHandlers.properties.get(
			{type:"admin", property:$stateParams.property}, 
			function (response){
				$scope.response = response;
				if(response && response.length>0){
					var p = response[0];
					var channels = {};
					for(var i=0; i<p.channels.length; i++){
						channels[p.channels[i]._id] = true;
					}
					$scope.data = p;
					$scope.data.channels = channels;
				}
			},
			function(response){
				alert("Error al cargar la propiedad.");
			});
	}
	$scope.selectedChannels = {};
	$scope.actions = reqHandlers.properties;
	$scope.channels = [];
	reqHandlers.channels.get(function (response){
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
				alert("Ha habido un problema al realizar la creación de la propiedad, contacte al administrador.");
				//alert(JSON.stringify(response));
			}
		}
	}

	$scope.submit = function(){
		if($scope.data._id){
			alert("IMPLEMENTAR ACCIÓN DE EDITAR");
		}
		else{
			$scope.actions.create($scope.data, cbs.create.success, cbs.create.error);
		}
	}
}