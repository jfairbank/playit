'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.run = run;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashLangIsPlainObject = require('lodash/lang/isPlainObject');

var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

var _lodashLangIsFunction = require('lodash/lang/isFunction');

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var websites = (function (sites) {
  for (var root in sites) {
    sites['www.' + root] = sites[root];
  }
  return sites;
})({
  'songza.com': {
    play: function play() {
      var _this = this;

      toggleSingle('.miniplayer-control-play-pause');

      if (this._isPlaying()) {
        this._getPlayer().then(function (player) {
          _this._nowPlaying(player.get('current'));
        });
      }
    },

    setup: function setup(ws) {
      var _this2 = this;

      this._ws = ws;

      this._getPlayer().then(function (player) {
        _this2._nowPlaying(player.get('current'));

        player.on('change:current', function (_, song) {
          if (song) {
            _this2._nowPlaying(song);
          }
        });
      });
    },

    _isPlaying: function _isPlaying() {
      return isHidden(document.querySelector('.miniplayer-control-play-pause .ui-icon-ios7-play'));
    },

    _getPlayer: function _getPlayer() {
      if (!this._playerPromise) {
        this._playerPromise = new _bluebird2['default'](function (resolve) {
          // Avoid WebPack interfering with AMD `require` call
          var req = window.require;
          req(['songza/app'], function (App) {
            resolve(App.getInstance().getPlayer().model);
          });
        });
      }

      return this._playerPromise;
    },

    _nowPlaying: function _nowPlaying(song) {
      this._ws.nowPlaying({
        website: 'Songza',
        title: '' + song.get('title') + ' by ' + song.get('artist'),
        icon: song.get('image_url')
      });
    }
  },

  'pandora.com': function pandoraCom() {
    toggle('.playButton', '.pauseButton');
  },

  'last.fm': function lastFm() {
    toggle('#radioControlPlay', '#radioControlPause');
  }
});

function toggleSingle(selector) {
  document.querySelector(selector).click();
}

function toggle(playSelector, pauseSelector) {
  var playButton = document.querySelector(playSelector);
  var pauseButton = document.querySelector(pauseSelector);

  if (isHidden(playButton)) {
    pauseButton.click();
  } else {
    playButton.click();
  }
}

function isHidden(el) {
  return window.getComputedStyle(el).display === 'none';
}

function run(hostname, cb) {
  var website = websites[hostname];
  var play = undefined,
      setup = function setup() {};

  if ((0, _lodashLangIsFunction2['default'])(website)) {
    play = website;
  } else if (website) {
    play = website.play.bind(website);

    if (website.setup) {
      setup = website.setup.bind(website);
    }
  }

  if (play) {
    cb(setup, play);
  }
}