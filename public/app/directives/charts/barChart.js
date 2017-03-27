app.directive('barChart', ['chartDataFactory', function(chartDataFactory) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title : "@",
      variable : "@",
      ylabel : "@"
    },
    link: function(scope, element, attributes){
      scope.xlabel = attributes.xlabel;
    },
    templateUrl: '/app/views/directives/charts/barChart.html',
    controller: ['$scope', function($scope) {
      $scope.type = "bar";
      $scope.sectionType = "reports";
      var lastResult = [];
      $scope.labels = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 
      'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
      
      $scope.filterCallback = function(result){
        lastResult = result;

        $scope.config = chartDataFactory.groupYearByMonth(result, $scope);
      }

      $scope.$watch('variable',function(){
        $scope.config = chartDataFactory.groupYearByMonth(lastResult, $scope);
      })

    }]
  };
}]);