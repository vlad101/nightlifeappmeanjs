'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {

  	// Redirect to the provided path, used to redirect to /auth/twitter path
    $scope.go = function ( path ) {
    	if(!path) return;

      // Set redirect query on twitter oath call
        $http.get('/api/sessions/setRedirect/' + $scope.searchLocationForm.locationQuery)
        .then(function successCallback(redirectLocation) {
        });
      window.location.href = path;
    };

    // Get user from session
    $http.get('/api/sessions/user')
        .then(function successCallback(userInfo) {
            for(var i in userInfo.data) {
              if(i == "_id") {
                $scope.userId = userInfo.data[i];
              }
            }
        // Get bars user goes to if user id is available
        if($scope.userId) {
          $http.get('/api/bars/user/' + $scope.userId)
              .then(function successCallback(userBarList) {

                var tempUserBarList = []; 

                for(var i in userBarList.data) {
                      tempUserBarList.push(userBarList.data[i]['bar_id']);
                }
                $scope.userBarList = tempUserBarList;
          });
        }
    });

    // Get redirect location from session at twitter callback
    $http.get('/api/sessions/getRedirect')
        .then(function successCallback(redirectLocation) {
          if(redirectLocation.data.length != 0) {
            if($scope.userId != undefined && redirectLocation.data.length != 0) {
              $timeout( function(){
                $scope.searchLocationForm.locationQuery = redirectLocation.data;
                $scope.searchLocationTimeout();
              }, 1000);
            }
          }
    });

    // Search location form
   	$scope.searchLocationForm = {
      	locationQuery: ""
     	};

    // Hide loading spinner.
  	$scope.loaded = true;

   	// Search location function returns found results by location
    $scope.searchLocation = function () {

      // Hide error
      $scope.yelpSearchResultsError = "";

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
              // Show error
	          	$scope.yelpSearchResultsError = "Cannot find location, try again!";
	    });

	    // Display the value in the form
      $scope.searchLocationForm.locationQuery = $scope.searchLocationForm.locationQuery;

      // Get list of bars selected as going by other users
      $http.get('/api/bars/')
          .then(function successCallback(response) {

            // Expose list of bar ids and their occuerences to front end
            $scope.barListDb = getBarsDb(response.data)
      });

    	// Hide loading spinner.
    	$scope.loaded = true;
    };

});

// Ge bars from database
function getBarsDb(data) {

  // Populate temp list with bar ids
  var tempBarListDb = [];
  for(var i in data)
    tempBarListDb.push(data[i].bar_id);

  // Get total number of occurences in a dictionary {bar_id: # of occurences}
  var resultBarDictDb = { };
  for(var i = 0; i < tempBarListDb.length; ++i) {
      if(!resultBarDictDb[tempBarListDb[i]])
          resultBarDictDb[tempBarListDb[i]] = 0;
      ++resultBarDictDb[tempBarListDb[i]];
  }

  return resultBarDictDb;
}