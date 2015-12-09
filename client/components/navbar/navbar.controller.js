'use strict';

angular.module('workspaceApp')
  .controller('NavbarCtrl', function ($scope, $location, $http) {

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
          for(var i in userInfo.data.twitter) {
            if(i == "username") {
              $scope.userName = userInfo.data.twitter[i];
            }
          }
    });

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });