'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _events = require('events');

var BasePlayer = (function (_EventEmitter) {
  function BasePlayer() {
    _classCallCheck(this, BasePlayer);

    if (_EventEmitter != null) {
      _EventEmitter.apply(this, arguments);
    }
  }

  _inherits(BasePlayer, _EventEmitter);

  _createClass(BasePlayer, [{
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