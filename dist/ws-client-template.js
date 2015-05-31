'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports.create = create;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var port = '<%= port %>';
var host = '<%= host %>';
var url = 'ws://' + host + ':' + port;

var WS = (function () {
  function WS() {
    _classCallCheck(this, WS);

    this._ws = new _ws2['default'](url);
  }

  _createClass(WS, [{
    key: 'on',
    value: function on(key, cb) {
      this._ws['on' + key] = cb;
    }
  }, {
    key: 'send',
    value: function send(data) {
      this._ws.send(JSON.stringify(data));
    }
  }, {
    key: 'sendNowPlaying',
    value: function sendNowPlaying(content) {
      this.send({
        content: content,
        action: 'now-playing'
      });
    }
  }]);

  return WS;
})();

function create() {
  return new WS();
}