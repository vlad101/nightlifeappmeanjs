'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {

  	// Redirect to the provided path, used to redirect to /auth/twitter path
    $scope.go = function ( path ) {
    	if(!path) return;

      // Set redirect query on twitter oath call
        $http.get('/api/sessions/setRedirect/' + $scope.searchLocationForm.locationQuery)
        .then(function successCallback(redirectLocation) {
          //
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

      // Hide yelp search error
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

    $scope.joinButtonClick = function (barId) {

      if(!$scope.userId || !barId)
        return;

      // Create bar
      var bar = { 
        "user_id": $scope.userId,
        "bar_id": barId,
        "active": true
      }

      // Add bar to the user bar list
      $http.post('/api/bars/', bar)
          .then(function successCallback(response) {
              $scope.addUserBar(barId);
            }, function errorCallback(response) {
              alert("Something went wrong, try again!");
      });
    }

    $scope.cancelButtonClick = function (barId) {
      
      if(!$scope.userId || !barId)
        return;

      // Remove bar from the user bar list
      $http.delete('/api/bars/barId/' + barId + '/userId/' + $scope.userId + '/')
          .then(function successCallback(response) {
              $scope.removeUserBar(barId);
            }, function errorCallback(response) {
              alert("Something went wrong, try again!");
      });
    }

    $scope.addUserBar = function(barId) {
      // Add bar to a list of bars attended by the users
      // Change the join button to cancel button 
      $scope.userBarList.push(barId);
      
      // Increment the value attending an event event
      if($scope.barListDb.hasOwnProperty(barId)) {
        // If bar in the db barlist, increment going people by 1
        $scope.barListDb[barId]++;
      } else {
        // If bar is not in the db barlist, add the bar to db list and set the value to 1
        $scope.barListDb[barId] = 1;
      }
    }

    $scope.removeUserBar = function(barId) {
      // Find bar in user bar list
      // Remove bar from a list of bars attended by the users
      // Change the cancel button to join button 
      for(var bar in $scope.userBarList) {
          if($scope.userBarList[bar] == barId) {
             $scope.userBarList.splice(bar, 1);
          }
      }
      
      // Decrement the value attending an event event
      if($scope.barListDb.hasOwnProperty(barId))

        // If people going is 0, remove the key-value pair from the dict
        if($scope.userBarList[barId] == 1) {
          for(var i = 0; i < $scope.barListDb.length; ++i)
          {
              if($scope.barListDb[i] == barId)
                  $scope.barListDb.splice(i, 1);
          }
        } else {
          // If more than one person going, decrement the number of people going
          $scope.barListDb[barId]--;
        }
    }

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