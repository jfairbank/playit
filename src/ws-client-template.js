import WebSocket from 'ws';

const port = '<%= port %>';
const host = '<%= host %>';
const url = `ws://${host}:${port}`;

class WS {
  constructor() {
    this._ws = new WebSocket(url);
  }

  on(key, cb) {
    this._ws[`on${key}`] = cb;
  }

  send(data) {
    this._ws.send(JSON.stringify(data));
  }

  nowPlaying(content) {
    this.send({
      content,
      action: 'now-playing'
    });
  }
}

export function create() {
  return new WS();
}
