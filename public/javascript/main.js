(function() {
angular.module('App', []);
var mainController = function($scope, $http) {
	console.log('hello from main.js');
	$http.get('/api/me').then(function(returnData) {
		$scope.user = returnData.data;
	});
};
angular.module('App')
	.controller('mainController', mainController)
}());