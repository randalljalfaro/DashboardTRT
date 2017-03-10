app.directive('tableEdit', 
  ['chartDataFactory', 'requestHandlers', 'formater', function(chartDataFactory, reqHandlers,formater) {
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

      /*alert("RESULT y: "+formater.numberFormat("2.344,4"));
      alert("RESULT y: "+formater.numberFormat("4,434.455.466.4"));
      alert("RESULT y: "+formater.numberFormat("45.566.666,434.455.466.4"));
      alert("RESULT y: "+formater.numberFormat("45.434.455,466.466"));
      alert("RESULT y: "+formater.numberFormat("45.434.455.466.466,3"));
      alert("RESULT n: "+formater.numberFormat("45,434.455,466.4"));
      alert("RESULT n: "+formater.numberFormat("45.434.455,466.4"));
      alert("RESULT n: "+formater.numberFormat("45.5r6.666,434.455.466.4"));
      alert("RESULT n: "+formater.numberFormat("45.56.66,434.455.466.4"));
      alert("RESULT n: "+formater.numberFormat("2.344,432.234,3"));
      alert("RESULT y: "+formater.toNumberFormat(2.3444));
      alert("RESULT y: "+formater.toNumberFormat(243543.5567));
      alert("RESULT y: "+formater.toNumberFormat(2435435567));
      alert("RESULT y: "+formater.toNumberFormat(0.5567));*/
      

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
        };
        for(var monthNumber in $scope.tableData.years[year].months){
          var month = $scope.tableData.years[year].months[monthNumber];
          if(!month.isNew  || (month["amount"]>0 || month["bedroom_count"]>0)){
            /*alert(month.amount+" - "+ month.bedroom_count);
            alert(typeof (""+month.amount));
            alert(typeof (""+month.bedroom_count));*/
            var validAmount = formater.fromNumberFormat(String(month.amount));
            var validBedroomsCount = formater.fromNumberFormat(String(month.bedroom_count));
            if(validAmount == null){
              alert("Error en el valor del monto '"+month.amount+"', en el mes de "+$scope.months[monthNumber]);
              return null;
            }
            if(validBedroomsCount==null){
              alert("Error en el valor de cantidad de cuartos '"+month.bedroom_count+"', en el mes de "+$scope.months[monthNumber]);
              return null;
            }
            data.months.push({
              amount: validAmount,
              bedroom_count: validBedroomsCount,
              number : monthNumber
            });
          }
        };
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
        };
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
        };
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

        function formatFields(variables){
          for(year in tableData.years){
            for(month in tableData.years[year].months){
              var monthVal = tableData.years[year].months[month];
              for(i in variables){
                tableData.years[year].months[month][variables[i]] = formater.toNumberFormat(monthVal[variables[i]]);
              }
            }
          }
        }

        formatFields(["amount", "bedroom_count"]);

      };
    }]
  };
}]);
