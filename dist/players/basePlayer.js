'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var BasePlayer = (function (_EventEmitter) {
  function BasePlayer() {
    _classCallCheck(this, BasePlayer);

    _get(Object.getPrototypeOf(BasePlayer.prototype), 'constructor', this).call(this);
    this.initialize();
  }

  _inherits(BasePlayer, _EventEmitter);

  _createClass(BasePlayer, [{
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'nowPlaying',
    value: function nowPlaying(song) {
      if (song) {
        this.emit('now-playing', song);
      }
    }
  }, {
    key: 'checkNowPlaying',
    value: function checkNowPlaying() {
      var song;
      return _regeneratorRuntime.async(function checkNowPlaying$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return this.getCurrentSong();

          case 2:
            song = context$2$0.sent;

            this.nowPlaying(song);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: '_click',
    value: function _click(selector) {
      document.querySelector(selector).click();
    }
  }, {
    key: '_toggle',
    value: function _toggle(playSelector, pauseSelector) {
      var playButton = document.querySelector(playSelector);
      var pauseButton = document.querySelector(pauseSelector);

      if (this._isHidden(playButton)) {
        pauseButton.click();
      } else {
        playButton.click();
      }
    }
  }, {
    key: '_isHidden',
    value: function _isHidden(el) {
      return window.getComputedStyle(el).display === 'none';
    }
  }], [{
    key: 'create',
    value: function create() {
      return new this();
    }
  }]);

  return BasePlayer;
})(_events.EventEmitter);

exports['default'] = BasePlayer;
module.exports = exports['default'];