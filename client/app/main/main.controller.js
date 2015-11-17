'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.loc = 'Brooklyn';
    $http.get('/api/yelp/location/' + $scope.loc).success(function(yelpSearchResults) {
      $scope.yelpSearchResults = yelpSearchResults;
    });
  });
