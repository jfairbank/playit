import WebSocket from 'ws';

const port = 3000;
const host = '<insert your host here>';
const url = `ws://${host}:${port}`;

export function createWebSocket() {
  return new WebSocket(url);
}
