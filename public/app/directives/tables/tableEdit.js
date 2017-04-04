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
        $scope.filterType = 'single';
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

        $scope.onEditClick = function(year, numMonth, channelId){
          if($scope.editing[year][channelId][numMonth]==null){
            $scope.editing[year][channelId][numMonth]=true;
          }else{
            $scope.editing[year][channelId][numMonth]=!$scope.editing[year][channelId][numMonth];
          }
        }

        $scope.onSaveClick = function(year, numMonth, channelId){
          var data = {
            property: $scope.propertySelected,
            channel: channelId,
            year: year,
            months:[]
          };

          for(var monthNum in $scope.tableData[year][channelId]){
            var month = $scope.tableData[year][channelId][monthNum];
            var validAmount = formater.fromNumberFormat(String(month.amount));
            var validBedroomsCount = formater.fromNumberFormat(String(month.bedroom_count));

            if(validAmount == null){
              alert("Error en el valor de la facturación '"+month.amount+"', en el mes de "+$scope.months[monthNum]);
              return null;
            }
            if(validBedroomsCount==null){
              alert("Error en el valor de cantidad de cuartos '"+month.bedroom_count+"', en el mes de "+$scope.months[monthNum]);
              return null;
            }
            data.months.push({
              amount: validAmount,
              bedroom_count: validBedroomsCount,
              number : monthNum
            });
          };

          reqHandlers.properties_data.update(
            data, 
            function(response){
              $scope.reloadData();
              $scope.editing[year][channelId][numMonth] = false;
              alert("Guardado exitoso.");
            }, 
            function(response){
              alert("Error al actualizar los datos, contacte al administrador.");
            });
        }

        function filterCallback(data, properties, channelsFilterInfo){
          if(data){
            $scope.propertySelected = properties[0];
            $scope.dataLength = data.length;
            $scope.channelsInfo = channelsFilterInfo;

            var config = chartDataFactory.groupForTableEdit(data);

            $scope.tableData = config.tableData;
            $scope.yearTotals = config.yearTotals;
            $scope.monthlyTotals = config.monthlyTotals;
            $scope.channelYearTotals = config.channelYearTotals;
          }
          $scope.allYears = [];

          for (var year = Number($scope.filterData.fromYear); year <= Number($scope.filterData.toYear); year++){
            $scope.allYears.push(year);
            $scope.editing[year] = {};
          }

          for(var year in $scope.editing){
            for(var channelId in channelsFilterInfo){
              $scope.editing[year][channelId] = {};
              for(var numMonth=0; numMonth<12; numMonth ++){
                $scope.editing[year][channelId][numMonth] = false;
                if(!$scope.tableData[year]){
                  $scope.tableData[year] = {};
                }
                if(!$scope.tableData[year][channelId]){
                  $scope.tableData[year][channelId] = {};
                }
                if(!$scope.tableData[year][channelId][numMonth]){
                  $scope.tableData[year][channelId][numMonth] = {
                    amount: 0, bedroom_count: 0
                  }
                }
              }
            }
          }

        };
      }]
    };
  }]);
