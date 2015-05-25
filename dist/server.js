'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports.start = start;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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

    ws.on('message', function (data) {
      if (data === 'remote-play') {
        wss.broadcast('play');
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