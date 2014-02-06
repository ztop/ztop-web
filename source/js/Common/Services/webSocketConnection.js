angular.module('ztop')
  .service('webSocketConnection', function($rootScope) {
    var host = window.document.location.host.replace(/:.*/, '');
    var port = 3000;
    var socket = new WebSocket('ws://' + host + ':' + port);
    
    var listeners = {};

    socket.onmessage = function(event) {
      listeners['flare'].forEach(function(callback) {
        $rootScope.$apply(function() {
          callback(JSON.parse(event.data));
        });
      });
    };

    return {
      subscribe: function(messageName, callback) {
        listeners[messageName] = listeners[messageName] || [];
        listeners[messageName].push(callback);
      }
    };
  });
