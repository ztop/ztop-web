'use strict';

angular.module('ztop', ['ngRoute', 'templates-main'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/system', {
        templateUrl: 'System/system.tpl.html',
        controller: 'SystemCtrl'
      })
      .otherwise({
        redirectTo: '/system'
      });
  });