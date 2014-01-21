'use strict';

/* Controllers */

var ztopApp = angular.module('ztopApp', ['angles']);

ztopApp.controller('ZtopCtrl', function ($scope, $interval, ZtopPollService) {
  $scope.data = ZtopPollService.data;

  //$scope.$watch('data',function(){console.log($scope.data);});

  $interval(function(){
    $scope.chart = [
      {
        labels : $scope.data.labels,
        datasets : [
          {
            fillColor : "rgba(151,187,205,0)",
            strokeColor : "#e67e22",
            pointColor : "rgba(151,187,205,0)",
            pointStrokeColor : "#e67e22",
            data : $scope.data.sent
          },
          {
            fillColor : "rgba(151,187,205,0)",
            strokeColor : "#f1c40f",
            pointColor : "rgba(151,187,205,0)",
            pointStrokeColor : "#f1c40f",
            data : $scope.data.recv
          }
        ], 
      }
    ];
    console.log($scope.data.sent);
    console.log($scope.data.recv);
  },5000);

  $scope.options = {
    segmentShowStroke : false
  };

  //$scope.$digest();
});