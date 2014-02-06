'use strict';

angular.module('ztop')
  .controller('MainCtrl', function($scope, webSocketConnection) {
    $scope.hi = 'howdy';
    webSocketConnection.subscribe('flare', function(data) {
      $scope.data = data;
    });
  });
