'use strict';

var _wsClient = require('./ws-client');

var ws = (0, _wsClient.createWebSocket)();
var button = document.querySelector('#play-pause-button');

button.addEventListener('click', function () {
  ws.send('remote-play');
});