app.directive('propertiesFilterByMonth', ["requestHandlers", function(reqHandlers) {
	return {
		restrict: 'E',
		transclude: true,
		scope: false,
		templateUrl: '/app/views/directives/properties_filter_by_month.html',
		controller: ['$scope', function($scope) {
			$scope.filterData = {
				fromYear : (new Date().getFullYear())+"",
				toYear :  (new Date().getFullYear())+"",
				channelsSelected : {},
				propertiesSelected : {}
			};
			var channelsInfo = {};
			$scope.years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
			$scope.property_data = [];
			$scope.channels = [];
			$scope.properties = [];
			$scope.reloadData =  reloadData;


			reqHandlers.channels.get(
				function (response){
					for(var i in response.data){
						var ch = response.data[i];
						channelsInfo[ch._id] = ch;
						$scope.channels.push(ch);
					}
				}, function(){});

			reqHandlers.properties.get(
				{type:$scope.sectionType},
				function (response){
					$scope.properties = response;
					if($scope.properties && $scope.properties.length > 0){
						$scope.filterData.propertyId = $scope.properties[0]._id;
						reloadData();
					}
				},
				function(response){
					alert("Error al cargar los datos de las propiedades.");
				});

			function reloadData(){
				var channels = [];
				var properties = [];
				var channelsFilterInfo = {};
				for(var channel in $scope.filterData.channelsSelected){
					if($scope.filterData.channelsSelected[channel]){
						channels.push(channel);
						channelsFilterInfo[channel] = channelsInfo[channel];
					}
				}
				if( $scope.filterType != 'single'){
					for(var property in $scope.filterData.propertiesSelected){
						if($scope.filterData.propertiesSelected[property]){
							properties.push(property);
						}
					}
				}
				else{
					properties.push($scope.filterData.propertyId);
				}
				reqHandlers.properties_data.get(
				{
					properties : properties,
					channels : channels,
					fromMonth : 0,
					fromYear : $scope.filterData.fromYear,
					toMonth : 12,
					toYear : $scope.filterData.toYear
				},
				function(result){
					$scope.filterCallback(result, properties, channelsFilterInfo, $scope.filterData);
				},
				function(result){
					alert("Error al traer los datos de la propiedad desde el servidor.");
				});
			}
		}]
	};
}]);

/*
var data = {};
if(result.length && result.length>0){
	for(var i=0; i<result.length; i++){
		var channelId = result[i]._id.channel;
		var year = result[i]._id.year;
		if(!data[channelId]){
			data[channelId] = {
				years : [],
				name : channelsInfo[channelId].name
			}
		}
		data[channelId].years.push({
			year: year,
			months: result[i].months
		});
	}
}
$scope.filterCallback(data, $scope.filterData.propertyId, channels);
*/