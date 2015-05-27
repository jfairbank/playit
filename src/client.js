import {create as createWebSocket} from './ws-client';
import {getForHost as getPlayerForHost} from './players';

const handlers = {
  play(player, ws) {
    player.play();
    checkCurrentlyPlaying(player, ws);
  },

  nextSong(player) {
    player.nextSong();
  }
};

function nowPlaying(player, ws) {
  player.getCurrentSong().then((song) => {
    ws.nowPlaying({
      website: player.getName(),
      title: `${song.title} by ${song.artist}`,
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
  const ws = createWebSocket();

  function onNextSong() {
    nowPlaying(player, ws);
  }

  ws.on('message', ({data}) => {
    const handler = handlers[data];

    if (handler) {
      handler(player, ws);
    }
  });

  ws.on('open', () => {
    // Send notification when a new song plays
    player.addListener('next-song', onNextSong);

    // Send notification for a currently playing song
    if (player.isPlaying()) {
      checkCurrentlyPlaying(player, ws);
    }
  });

  ws.on('close', () => {
    player.removeListener('next-song', onNextSong);

    // Try reconnecting
    setTimeout(() => { initWebSocket(player); }, 1000);
  });
}

getPlayerForHost(document.location.hostname, initWebSocket);
