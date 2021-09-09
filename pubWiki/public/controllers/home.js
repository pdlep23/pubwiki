wikiApp.controller("homeController", function($scope, $http) {
  // Controller for home view
	
	//when search button is clicked, retreive info from input
	//GET request the search info display in the search results
	$scope.search = function(searchText) {
			$scope.pubWiki = "";
      $http.get("/api/wiki/search/" + searchText).then(function(response){
				$scope.pubWiki = response.data;
			}).catch(function(err){
				console.log(err.data);
			})
  }
		
});