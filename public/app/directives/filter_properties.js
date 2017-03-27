app.directive('filterProperties', ["requestHandlers", function(reqHandlers) {
  return {
    restrict: 'E',
    transclude: true,
    scope: false,
    link: function(scope, element, attributes){
      scope.sectionType = attributes.sectionType;
    },
    templateUrl: '/app/views/directives/filter_properties.html',
    controller: ['$scope', function($scope) {
      $scope.data = {
        fromYear : (new Date().getFullYear())+"",
        fromMonth: "enero",
        toYear : (new Date().getFullYear())+"",
        toMonth: "diciembre"
      };

      var channelsInfo = {};
      reqHandlers.channels.get(
        function (response){
          for(var i in response.data){
            var ch = response.data[i];
            channelsInfo[ch._id] = ch;
          }
        }, function(){});


      $scope.channels = [];

      $scope.properties = [];
      //alert($scope.sectionType);

      reqHandlers.properties.get(
        {type:$scope.sectionType},
        function (response){
          $scope.properties = response.data;
          if($scope.properties && $scope.properties.length > 0){
            $scope.data.propertyId = $scope.properties[0]._id;
          }
        },function(response){
          alert("Error al cargar las propiedades, contactar al administrador.");
        });

      $scope.property_data = [];

      $scope.months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 
      'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
      $scope.years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

      //--------------------------------------------------------
      $scope.$watch('data.propertyId',function(){
        updatePropertyId();
      });
      $scope.$watch('data.channelId', function(){
        reloadData($scope.data.propertyId);
      });

      //--------------------------------------------------------
      function updatePropertyId(){
        for(var property in $scope.properties){
          var prop = $scope.properties[property];
          if(prop._id == $scope.data.propertyId){
            $scope.channels = prop.channels;
            if($scope.channels && $scope.channels.length > 0){
              $scope.data.channelId = $scope.channels[0]._id;
            }
            if($scope.data.channelId)
              reloadData(prop);
          }
        }
      }

      //--------------------------------------------------------
      $scope.reloadData =  reloadData;
      function reloadData(property){
        if(property){
          var isData = false;
          for(var channel_data in property.data){
            var ch_d = property.data[channel_data];
            if(ch_d.channel == $scope.data.channelId){
              isData = true;
            }
          }
          if(!isData)
            $scope.property_data = [];

          reqHandlers.properties_data.get({
            propertyId : $scope.data.propertyId,
            channels : [$scope.data.channelId],
            fromMonth : $scope.months.indexOf($scope.data.fromMonth),
            fromYear : $scope.data.fromYear,
            toMonth : $scope.months.indexOf($scope.data.toMonth),
            toYear : $scope.data.toYear
          },
          function(result){
            if(result.length && result.length>0){
              $scope.filterCallback(result, $scope.data.propertyId, channelsInfo);
            }
            else
              $scope.filterCallback([]);
            //alert(JSON.stringify(result));
          },
          function(result){
            console.log("Error al traer los datos de la propiedad desde el servidor.");
            alert(JSON.stringify(result));
          });
        }
      }
    }]
  };
}]);