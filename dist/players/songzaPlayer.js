'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _basePlayer = require('./basePlayer');

var _basePlayer2 = _interopRequireDefault(_basePlayer);

var SongzaPlayer = (function (_BasePlayer) {
  function SongzaPlayer() {
    _classCallCheck(this, SongzaPlayer);

    if (_BasePlayer != null) {
      _BasePlayer.apply(this, arguments);
    }
  }

  _inherits(SongzaPlayer, _BasePlayer);

  _createClass(SongzaPlayer, [{
    key: 'initialize',
    value: function initialize() {
      this._initEvents();
    }
  }, {
    key: 'name',
    get: function () {
      return 'Songza';
    }
  }, {
    key: 'play',
    value: function play() {
      this._click('.miniplayer-control-play-pause');
    }
  }, {
    key: 'getCurrentSong',
    value: function getCurrentSong() {
      var _this = this;

      return new _Promise(function callee$2$0(resolve) {
        var app, player, song;
        return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return this._getApp();

            case 2:
              app = context$3$0.sent;
              player = app.getPlayer();

              if (player) {
                context$3$0.next = 6;
                break;
              }

              return context$3$0.abrupt('return', resolve(null));

            case 6:
              song = player.model.get('current');

              resolve(this._serializeSong(song));

            case 8:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this);
      });
    }
  }, {
    key: 'nextSong',
    value: function nextSong() {
      this._click('.miniplayer-control-skip');
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      var app;
      return _regeneratorRuntime.async(function _initEvents$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return this._getApp();

          case 2:
            app = context$2$0.sent;

            app.on({
              'player-song-play': this._onSongPlay,
              'player-song-started': this._onSongPlay
            }, this);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: '_onSongPlay',
    value: function _onSongPlay(_ref) {
      var song = _ref.song;

      this.nowPlaying(this._serializeSong(song));
    }
  }, {
    key: '_getApp',
    value: function _getApp() {
      if (!this._playerPromise) {
        this._playerPromise = new _Promise(function (resolve) {
          // Avoid WebPack interfering with AMD `require` call
          var req = window.require;
          req(['songza/app'], function (App) {
            return resolve(App.getInstance());
          });
        });
      }

      return this._playerPromise;
    }
  }, {
    key: '_serializeSong',
    value: function _serializeSong(song) {
      if (!song) {
        return null;
      }

      return {
        title: song.get('title'),
        artist: song.get('artist'),
        icon: song.get('image_url')
      };
    }
  }]);

  return SongzaPlayer;
})(_basePlayer2['default']);

exports['default'] = SongzaPlayer;
module.exports = exports['default'];