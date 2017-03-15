app.factory('filterService', ['$filter', function($filter) {
	return {
		pagination : function ($scope, tableData){
			$scope.currentPage = 0;
			$scope.pageSize = 5;
			$scope.tableData = tableData;
			$scope.query = '';

			$scope.getData = function () {
				// https://docs.angularjs.org/api/ng/filter/filter
				return $filter('filter')($scope.tableData, $scope.query);
			}

			$scope.numberOfPages=function(){
				var n = Math.ceil($scope.getData().length/$scope.pageSize);
				if(n<1) return 0;
				return n;                
			}

			$scope.next = function(){
				if($scope.currentPage < $scope.numberOfPages()){
					$scope.currentPage++;
				}
			}

			$scope.previous = function(){
				if($scope.currentPage > 0){
					$scope.currentPage--;
				}
			}
		}
	}
}]);