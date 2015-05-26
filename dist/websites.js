'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.run = run;
var websites = (function (sites) {
  for (var root in sites) {
    sites['www.' + root] = sites[root];
  }
  return sites;
})({
  'songza.com': function songzaCom() {
    toggleSingle('.miniplayer-control-play-pause');
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
  var play = websites[hostname];

  if (play) {
    cb(play);
  }
}