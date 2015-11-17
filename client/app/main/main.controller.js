'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {

  	// Redirect to the provided path, used to redirect to /auth/twitter path
    $scope.go = function ( path ) {
    	if(!path) return;
      	window.location.href = path;
    };

    // Search location form
 	$scope.searchLocationForm = {
    	locationQuery: ""
   	};

    // Hide loading spinner.
	$scope.loaded = true;

   	// Search location function returns found results by location
    $scope.searchLocation = function () {

    	// Show loading spinner.
  		$scope.loaded = false;

  		// Hide search results
  		$scope.yelpSearchResults = "";

  		// Set timeout to search function so user would see the spinner for at least 1 second
    	$timeout( function(){ 
    		$scope.searchLocationTimeout(); 
    	}, 1000);
    };

    // Search location query
    $scope.searchLocationTimeout = function () {

	    // Get results for locaton query
	    $http.get('/api/yelp/location/' + $scope.searchLocationForm.locationQuery)
	        .then(function successCallback(yelpSearchResults) {
	            $scope.yelpSearchResults = yelpSearchResults;
	          }, function errorCallback(response) { 
	          	$scope.yelpSearchResults = "Cannot find location, try again!";
	    });

	    // Display the value in the form
        $scope.searchLocationForm.locationQuery = $scope.searchLocationForm.locationQuery;

    	// Hide loading spinner.
    	$scope.loaded = true;
    };

  });
