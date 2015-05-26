'use strict';

var _wsClient = require('./ws-client');

var _websitesJs = require('./websites.js');

(0, _websitesJs.run)(document.location.hostname, function (play) {
  var ws = (0, _wsClient.createWebSocket)();

  ws.onmessage = function (_ref) {
    var data = _ref.data;

    if (data === 'play') {
      play();
    }
  };
});