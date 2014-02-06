'use strict';

angular.module('ztop')
  .directive('chart', function() {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        console.log(scope);
      },
      scope: {
        title: '=title'
      }
    };
  });
