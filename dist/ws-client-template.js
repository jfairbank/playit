'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports.createWebSocket = createWebSocket;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var port = '<%= port %>';
var host = '<%= host %>';
var url = 'ws://' + host + ':' + port;

function createWebSocket() {
  return new _ws2['default'](url);
}