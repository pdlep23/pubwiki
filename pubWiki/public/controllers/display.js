wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {

	//GET request to display parameters Wiki info
	$http.get('/api/wiki/' + $routeParams.urlName)
	.then(function(response) {
		console.log(response);
		$scope.wiki = response.data;
	})
	.catch(function(err) {
		alert("Incorrect");
	})
});