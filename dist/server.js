'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.start = start;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _ws = require('ws');

var _clientCompile = require('./client-compile');

var mediakeys = require('mediakeys').listen();

function runWebServer(port) {
  var app = (0, _express2['default'])();

  app.use(_express2['default']['static'](__dirname + '/../public'));

  app.listen(port, function () {
    console.log('HTTP server listening on port ' + port + '...');
  });
}

function runWebSocketServer(port) {
  var wss = new _ws.Server({ port: port });

  wss.broadcast = function (data) {
    wss.clients.forEach(function (client) {
      return client.send(data);
    });
  };

  wss.on('connection', function (ws) {
    var play = ws.send.bind(ws, 'play');

    mediakeys.on('play', play);
    mediakeys.on('next', function () {
      return ws.send('nextSong');
    });

    ws.on('message', function (json) {
      var _JSON$parse = JSON.parse(json);

      var action = _JSON$parse.action;
      var content = _JSON$parse.content;

      switch (action) {
        case 'remote-play':
          wss.broadcast('play');
          break;

        case 'now-playing':
          _nodeNotifier2['default'].notify({
            title: content.website,
            message: content.title,
            icon: content.icon
          });
          break;
      }
    });

    ws.on('close', function () {
      return mediakeys.removeListener('play', play);
    });
  });

  console.log('Web socket server listening on port ' + port + '...');
}

function start(wsPort, httpPort) {
  return (0, _clientCompile.compile)(wsPort).then(function () {
    runWebServer(httpPort);
    runWebSocketServer(wsPort);
  });
}