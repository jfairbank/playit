'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _lodashLangIsEqual = require('lodash/lang/isEqual');

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

var _basePlayer = require('./basePlayer');

var _basePlayer2 = _interopRequireDefault(_basePlayer);

var PandoraPlayer = (function (_BasePlayer) {
  function PandoraPlayer() {
    _classCallCheck(this, PandoraPlayer);

    if (_BasePlayer != null) {
      _BasePlayer.apply(this, arguments);
    }
  }

  _inherits(PandoraPlayer, _BasePlayer);

  _createClass(PandoraPlayer, [{
    key: 'initialize',
    value: function initialize() {
      this._pollForCurrentSong();
    }
  }, {
    key: 'name',
    get: function () {
      return 'Pandora';
    }
  }, {
    key: 'play',
    value: function play() {
      this._toggle('.playButton', '.pauseButton');
    }
  }, {
    key: 'nextSong',
    value: function nextSong() {
      this._click('.skipButton');
    }
  }, {
    key: 'getCurrentSong',
    value: function getCurrentSong() {
      return _Promise.resolve(this._currentSong || this._getCurrentPlayingSong());
    }
  }, {
    key: '_getCurrentlyPlayingSong',
    value: function _getCurrentlyPlayingSong() {
      var title = this._getElAttr('.playerBarSong', 'textContent').trim();
      var artist = this._getElAttr('.playerBarArtist', 'textContent').trim();
      var icon = this._getElAttr('.playerBarArt', 'src');

      if (!title || !artist || !icon) {
        return null;
      }

      return { title: title, artist: artist, icon: icon };
    }
  }, {
    key: '_getElAttr',
    value: function _getElAttr(selector, attr) {
      var el = document.querySelector(selector);
      return el && el[attr] || '';
    }
  }, {
    key: '_pollForCurrentSong',
    value: function _pollForCurrentSong() {
      var song = this._getCurrentlyPlayingSong();

      if (!(0, _lodashLangIsEqual2['default'])(this._currentSong, song)) {
        this._currentSong = song;
        this.nowPlaying(song);
      }

      setTimeout(this._pollForCurrentSong.bind(this), 5000);
    }
  }]);

  return PandoraPlayer;
})(_basePlayer2['default']);

exports['default'] = PandoraPlayer;
module.exports = exports['default'];