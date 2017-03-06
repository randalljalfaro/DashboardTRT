app.directive('pieChart', ['chartDataFactory', function(chartDataFactory) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title : "@",
      variable : "@"
    },
    templateUrl: '/app/views/directives/charts/pieChart.html',
    controller: ['$scope', function($scope) {
      $scope.type = "pie";
      var lastResult = [];
      $scope.filterCallback = function(result){
        lastResult = result;
        $scope.config = chartDataFactory.groupChannelValues(result, $scope);
      }

      $scope.$watch('variable',function(){
        $scope.config = chartDataFactory.groupChannelValues(lastResult, $scope);
      })

    }]
  };
}]);