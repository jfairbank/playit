'use strict';

var _wsClient = require('./ws-client');

var websites = {
  'songza.com': function songzaCom() {
    jQuery('.miniplayer-control-play-pause').click();
  },

  'pandora.com': function pandoraCom() {
    var $playButton = jQuery('.playButton');
    var $pauseButton = jQuery('.pauseButton');

    if ($playButton.is(':hidden')) {
      $pauseButton.click();
    } else {
      $playButton.click();
    }
  }
};

var play = websites[document.location.hostname];

if (play) {
  var ws = (0, _wsClient.createWebSocket)();

  ws.onmessage = function (_ref) {
    var data = _ref.data;

    if (data === 'play') {
      play();
    }
  };
}