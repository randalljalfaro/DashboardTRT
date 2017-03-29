app.directive('tableEdit', 
  ['chartDataFactory', 'requestHandlers', 'formater', 
  function(chartDataFactory, reqHandlers,formater) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        editable : "@",
        sectionType : "@"
      },
      templateUrl: '/app/views/directives/tables/tableEdit.html',
      controller: ['$scope', function($scope) {
        $scope.formater = formater;
        $scope.filterCallback = filterCallback;
        $scope.editing = {};
        $scope.allYears = [];
        $scope.tableData = {};
        $scope.totals = {};
        $scope.channelsLength = 0;
        $scope.dataLength = 0;
        $scope.months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
        'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        $scope.onEditClick = function(year, month){
          if($scope.editing[year][month]==null){
            $scope.editing[year][month]=true;
          }else{
            $scope.editing[year][month]=!$scope.editing[year][month];
          }
        }

        $scope.onSaveClick = function(year){
          $scope.editing[year][month] = false;
        }

        function filterCallback(data, properties, channels){
          $scope.dataLength = data.length;
          $scope.channelsLength = channels.length;
          $scope.channels = channels;

          var config = chartDataFactory.groupForTableEdit(data);

          $scope.tableData = config.tableData;
          $scope.yearTotals = config.yearTotals;
          $scope.monthlyTotals = config.monthlyTotals;
          $scope.channelYearTotals = config.channelYearTotals;
          $scope.allYears = [];

          for (var year = Number($scope.filterData.fromYear); year <= Number($scope.filterData.toYear); year++){
            $scope.allYears.push(year);
          }

        };
      }]
    };
  }]);
