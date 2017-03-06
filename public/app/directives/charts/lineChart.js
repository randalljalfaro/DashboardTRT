app.directive('lineChart', ['chartDataFactory', function(chartDataFactory) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title : "@",
      variable : "@",
      ylabel: "@",
      xlabel: "@"
    },
    templateUrl: '/app/views/directives/charts/lineChart.html',
    controller: ['$scope', function($scope) {
      $scope.type = "line";
      $scope.labels = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 
      'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];

      var lastResult = [];
      $scope.filterCallback = function(result){
        lastResult = result;
        $scope.config = chartDataFactory.groupChannelByMonth(result, $scope);
      }

      $scope.$watch('variable',function(){
        $scope.config = chartDataFactory.groupChannelByMonth(lastResult, $scope);
      })

    }]
  };
}]);