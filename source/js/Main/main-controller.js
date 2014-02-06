'use strict';

angular.module('ztop')
  .controller('MainCtrl', function($scope, $http) {
    $scope.hi = 'howdy';
    $http.get('flare.json').then(function(response) {
      $scope.data = response.data;
    });
  });
