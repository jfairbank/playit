'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _lodashLangIsEqual = require('lodash/lang/isEqual');

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

var _basePlayer = require('./basePlayer');

var _basePlayer2 = _interopRequireDefault(_basePlayer);

var PandoraPlayer = (function (_BasePlayer) {
  function PandoraPlayer() {
    _classCallCheck(this, PandoraPlayer);

    _get(Object.getPrototypeOf(PandoraPlayer.prototype), 'constructor', this).call(this);
    this._pollForCurrentSong();
  }

  _inherits(PandoraPlayer, _BasePlayer);

  _createClass(PandoraPlayer, [{
    key: 'getName',
    value: function getName() {
      return 'Pandora';
    }
  }, {
    key: 'play',
    value: function play() {
      this._toggle('.playButton', '.pauseButton');
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this._isHidden(document.querySelector('.playButton'));
    }
  }, {
    key: 'nextSong',
    value: function nextSong() {
      this._click('.skipButton');
    }
  }, {
    key: 'getCurrentSong',
    value: function getCurrentSong() {
      return Promise.resolve(this._currentSong || this._getCurrentPlayingSong());

      //if (!this._currentSongPromise) {
      //this._currentSongPromise = new Promise((resolve) => {
      //const helper = () => {
      //if (this._currentSong) {
      //resolve(this._currentSong);
      //} else {
      //setTimeout(helper, 1000);
      //}
      //};

      //helper();
      //});
      //}

      //return this._currentSongPromise;
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

        if (song) {
          this.emit('next-song', song);
        }
      }

      setTimeout(this._pollForCurrentSong.bind(this), 5000);
    }
  }]);

  return PandoraPlayer;
})(_basePlayer2['default']);

exports['default'] = PandoraPlayer;
module.exports = exports['default'];