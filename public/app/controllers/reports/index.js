app.controller("ReportsCtrl", ["$scope", ReportsCtrl]);

function ReportsCtrl($scope) {
	$scope.viewType = '0';
	$scope.plotType = '0';
	$scope.plotSubType = '0';
	$scope.plotTitle = '';
	$scope.plotVariable = '';

	function refresh(){
		if($scope.plotType=="0"){
			if ($scope.plotSubType=="0") {
				$scope.plotTitle = "Facturación mensual por año";
				$scope.plotVariable = "amount";
				$scope.ylabel = "Facturación ($)";
			}
			else {
				$scope.plotTitle = "Cantidad de cuartos mensual por año";
				$scope.plotVariable = "bedroom_count";
				$scope.ylabel = "Cantidad de cuartos";
			}
		}
		else if($scope.plotType=="1"){
			if ($scope.plotSubType=="0") {
				$scope.plotTitle = "Facturación por canal";
				$scope.plotVariable = "amount";
			}
			else{
				$scope.plotTitle = "Cantidad de cuartos por canal";
				$scope.plotVariable = "bedroom_count";
			}
		}
		else if($scope.plotType=="2"){
			if ($scope.plotSubType=="0") {
				$scope.plotTitle = "Facturación mensual por canal";
				$scope.plotVariable = "amount";
				$scope.ylabel = "Facturación ($)";
			}
			else{
				$scope.plotTitle = "Cantidad de cuartos mensual por canal";
				$scope.plotVariable = "bedroom_count";
				$scope.ylabel = "Cantidad de cuartos";
			}
		}
	}
	$scope.$watch('plotSubType', refresh);
	$scope.$watch('plotType', refresh);
	refresh();
};