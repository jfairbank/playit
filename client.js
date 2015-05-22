import WebSocket from 'ws';

const port = 3000;
const ip = '<insert your local ip>';
const url = `ws://${ip}:${port}`;
const ws = new WebSocket(url);

ws.onmessage = (e) => {
  if (e.data === 'play') {
    jQuery('.miniplayer-control-play-pause').click();
  }
};
