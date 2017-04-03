app.directive('pieChart', ['chartDataFactory', 'formater', function(chartDataFactory, formater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title : "@",
      variable : "@"
    },
    templateUrl: '/app/views/directives/charts/pieChart.html',
    controller: ['$scope', function($scope) {
      $scope.formater = formater;
      $scope.type = "pie";
      $scope.sectionType = "reports";
      var lastResult = [];
      var lastProperties = [];
      var lastChannels = [];
      $scope.filterCallback = function(result, properties, channels){
        lastResult = result;
        //Esto es por ahora, se debe permitir que vengan varias propiedades
        lastProperties = [properties];
        lastChannels = channels;
        $scope.config = chartDataFactory.groupYearsByChannel(lastResult, $scope, lastProperties, lastChannels);
      }

      $scope.$watch('variable',function(){
        $scope.config = chartDataFactory.groupYearsByChannel(lastResult, $scope, lastProperties, lastChannels);
      })

    }]
  };
}]);