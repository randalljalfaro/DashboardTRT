app.directive('tableEdit', ['chartDataFactory', 'requestHandlers', function(chartDataFactory, reqHandlers) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      editable : "@",
      sectionType : "@"
    },
    templateUrl: '/app/views/directives/tables/tableEdit.html',
    controller: ['$scope', function($scope) {
      //Función necesaria para quien use cualquiera de los filtros
      $scope.filterCallback = filterCallback;
      $scope.editing = {};
      $scope.months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 
      'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
      $scope.tableData = {
        years:{},
        totals:{}
      };
      $scope.propertySelected="";
      $scope.data_length=0;
      $scope.channelSelected="";

      //---------------------------------------------------------------
      $scope.onEditClick = function(year){
        if($scope.editing[year]==null){
          $scope.editing[year]=true;
        }else{
          $scope.editing[year]=!$scope.editing[year];
        }
      }

      //---------------------------------------------------------------
      $scope.onSaveClick = function(year){
        var data = {
          property: $scope.propertySelected,
          channel: $scope.channelSelected,
          year: year,
          months:[]
        }
        for(var monthNumber in $scope.tableData.years[year].months){
          var month = $scope.tableData.years[year].months[monthNumber];
          if(!month.isNew  || (month["amount"]>0 || month["bedroom_count"]>0)){
            data.months.push({
              amount: month.amount,
              bedroom_count: month.bedroom_count,
              number : monthNumber
            });
          }
        }
        $scope.editing[year]=!$scope.editing[year];
        reqHandlers.properties_data.update(
          data, 
          function(response){
            $scope.reloadData($scope.propertySelected);
            alert("Guardado exitoso.");
          }, 
          function(){
            alert("Error al actualizar los datos, contacte al administrador.");
          });
        //console.log(data);
      }

      //---------------------------------------------------------------
      function filterCallback(property_data, propertyId, channels){
        var data = property_data;
        $scope.propertySelected = propertyId;
        $scope.data_length = channels.length;
        if(channels.length>0){
          $scope.channelSelected = channels[0];
        }
        var tableData = {
          years:{},
          totals:{}
        };
        for(var channelId in data){
          var channel = data[channelId];
          for(var i = 0; i < channel.years.length; i++){
            var yearData = channel.years[i];
            checkAndInitYear("amount", yearData.year);
            checkAndInitYear("bedroom_count", yearData.year);
            for(var j = 0; j < yearData.months.length; j++){
              var monthData = yearData.months[j];
              checkAndInitCounts("amount", yearData.year, monthData.number, monthData.amount);
              checkAndInitCounts("bedroom_count", yearData.year, monthData.number, monthData.bedroom_count);
            }
          }
        }
        $scope.totalYearRange = [];
        for (var year = $scope.filterData.fromYear; year <= $scope.filterData.toYear; year++) {
          $scope.totalYearRange.push(year);
        //for(var year in tableData.years){
          if(!tableData.years[year]){
            tableData.years[year] = {
              months: {}, 
              totals: {amount:0, bedroom_count:0}
            };
          }
          for(var i=0; i<$scope.months.length; i++){
            if(!tableData.years[year].months[i]){
              tableData.years[year].months[i] = {
                amount: 0, 
                bedroom_count: 0,
                isNew: true,
                number: i
              };
            }
          }
        }
        $scope.tableData = tableData;

        function checkAndInitYear(variable, year){
          if(!tableData.totals[variable]){
            tableData.totals[variable] = 0;
          }
          if(!tableData.years[year]){
            tableData.years[year] = {
              totals: {},
              months : {}
            };
          }
        }
        function checkAndInitCounts(variable, year, month, value){
          if(tableData.years[year].months[month] == null){
            tableData.years[year].months[month] = {
              isNew : false
            };
          }

          if(tableData.years[year].months[month][variable] == null){
            tableData.years[year].months[month][variable] = value;
          }
          else{
            tableData.years[year].months[month][variable] += value;
          }

          if(tableData.years[year].totals[variable] == null){
            tableData.years[year].totals[variable] = value;
          }else{
            tableData.years[year].totals[variable] += value;
          }
          tableData.totals[variable] += value;
        }

        //++++++++++++++++++++++++
        //alert(JSON.stringify($scope.filterData));
      };
    }]
  };
}]);
