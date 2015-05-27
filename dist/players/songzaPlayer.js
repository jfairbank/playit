'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _basePlayer = require('./basePlayer');

var _basePlayer2 = _interopRequireDefault(_basePlayer);

var SongzaPlayer = (function (_BasePlayer) {
  function SongzaPlayer() {
    _classCallCheck(this, SongzaPlayer);

    _get(Object.getPrototypeOf(SongzaPlayer.prototype), 'constructor', this).call(this);
    this._initEvents();
  }

  _inherits(SongzaPlayer, _BasePlayer);

  _createClass(SongzaPlayer, [{
    key: 'getName',
    value: function getName() {
      return 'Songza';
    }
  }, {
    key: 'play',
    value: function play() {
      this._click('.miniplayer-control-play-pause');
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this._isHidden(document.querySelector('.miniplayer-control-play-pause .ui-icon-ios7-play'));
    }
  }, {
    key: 'getCurrentSong',
    value: function getCurrentSong() {
      var _this = this;

      return this._getPlayer().then(function (player) {
        return _this._serializeSong(player.get('current'));
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
      var _this2 = this;

      this._getPlayer().then(function (player) {
        player.on('change:current', function (_, song) {
          if (song) {
            _this2.emit('next-song', _this2._serializeSong(song));
          }
        });
      });
    }
  }, {
    key: '_getPlayer',
    value: function _getPlayer() {
      var _this3 = this;

      if (!this._playerPromise) {
        this._playerPromise = new Promise(function (resolve, reject) {
          // Avoid WebPack interfering with AMD `require` call
          var req = window.require;

          req(['songza/app'], function (App) {
            var playerView = App.getInstance().player;

            if (playerView) {
              resolve(playerView.model);
            } else {
              reject();
              _this3._playerPromise = null;
            }
          });
        });
      }

      return this._playerPromise;
    }
  }, {
    key: '_serializeSong',
    value: function _serializeSong(song) {
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