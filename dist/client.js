'use strict';

var _wsClient = require('./ws-client');

var _players = require('./players');

var handlers = {
  play: function play(player, ws) {
    player.play();
    checkCurrentlyPlaying(player, ws);
  },

  nextSong: function nextSong(player) {
    player.nextSong();
  }
};

function nowPlaying(player, ws) {
  player.getCurrentSong().then(function (song) {
    ws.nowPlaying({
      website: player.getName(),
      title: '' + song.title + ' by ' + song.artist,
      icon: song.icon
    });
  });
}

function checkCurrentlyPlaying(player, ws) {
  if (player.isPlaying()) {
    nowPlaying(player, ws);
  }
}

function initWebSocket(player) {
  var ws = (0, _wsClient.create)();

  function onNextSong() {
    nowPlaying(player, ws);
  }

  ws.on('message', function (_ref) {
    var data = _ref.data;

    var handler = handlers[data];

    if (handler) {
      handler(player, ws);
    }
  });

  ws.on('open', function () {
    // Send notification when a new song plays
    player.addListener('next-song', onNextSong);

    // Send notification for a currently playing song
    if (player.isPlaying()) {
      checkCurrentlyPlaying(player, ws);
    }
  });

  ws.on('close', function () {
    player.removeListener('next-song', onNextSong);

    // Try reconnecting
    setTimeout(function () {
      initWebSocket(player);
    }, 1000);
  });
}

(0, _players.getForHost)(document.location.hostname, initWebSocket);