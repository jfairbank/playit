'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createWebSocket = createWebSocket;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var port = '<%= port %>';
var host = '<%= host %>';
var url = 'ws://' + host + ':' + port;

function createWebSocket() {
  return new _ws2['default'](url);
}