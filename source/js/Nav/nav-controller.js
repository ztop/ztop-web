'use strict';

angular.module('ztop')
  .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'pure-menu-selected' : '';
    };
  }]);
