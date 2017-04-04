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
      $scope.sectionType = "reports";

      var lastResult = [];
      var lastProperties = [];
      var lastChannels = [];
      var lastFilterConfig = [];
      $scope.filterCallback = function(result, properties, channels, filterConfig){
        lastResult = result;
        lastProperties = properties;
        lastChannels = channels;
        lastFilterConfig = filterConfig;
        $scope.config = chartDataFactory.groupChannelByMonth(lastResult, $scope, lastProperties, lastChannels, lastFilterConfig);
      }

      $scope.$watch('variable',function(){
        $scope.config = chartDataFactory.groupChannelByMonth(lastResult, $scope, lastProperties, lastChannels, lastFilterConfig);
      })

    }]
  };
}]);