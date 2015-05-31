import { create as createWebSocket } from './ws-client';
import { getForHost as getPlayerForHost } from './players';

const handlers = {
  play(player) {
    player.play();
  },

  nextSong(player) {
    player.nextSong();
  }
};

function sendNowPlaying(ws, player, song) {
  ws.sendNowPlaying({
    player: player.name,
    song: {
      title: `${song.title} by ${song.artist}`,
      icon: song.icon
    }
  });
}

function initWebSocket(player) {
  const ws = createWebSocket();

  function nowPlaying(song) {
    sendNowPlaying(ws, player, song);
  }

  ws.on('message', ({data}) => {
    const handler = handlers[data];

    if (handler) {
      handler(player, ws);
    }
  });

  ws.on('open', () => {
    // Send notification when a new song plays
    player.addListener('now-playing', nowPlaying);
  });

  ws.on('close', () => {
    player.removeListener('now-playing', nowPlaying);

    // Try reconnecting
    setTimeout(() => { initWebSocket(player); }, 1000);
  });

  player.checkNowPlaying();
}

getPlayerForHost(document.location.hostname, initWebSocket);
