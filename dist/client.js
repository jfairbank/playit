'use strict';

var _wsClient = require('./ws-client');

var _players = require('./players');

var handlers = {
  play: function play(player) {
    player.play();
  },

  nextSong: function nextSong(player) {
    player.nextSong();
  }
};

function sendNowPlaying(ws, player, song) {
  ws.sendNowPlaying({
    player: player.name,
    song: {
      title: '' + song.title + ' by ' + song.artist,
      icon: song.icon
    }
  });
}

function initWebSocket(player) {
  var ws = (0, _wsClient.create)();

  function nowPlaying(song) {
    sendNowPlaying(ws, player, song);
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
    player.addListener('now-playing', nowPlaying);
  });

  ws.on('close', function () {
    player.removeListener('now-playing', nowPlaying);

    // Try reconnecting
    setTimeout(function () {
      initWebSocket(player);
    }, 1000);
  });

  player.checkNowPlaying();
}

(0, _players.getForHost)(document.location.hostname, initWebSocket);