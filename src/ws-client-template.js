import WebSocket from 'ws';

const port = '<%= port %>';
const host = '<%= host %>';
const url = `ws://${host}:${port}`;

export function createWebSocket() {
  return new WebSocket(url);
}
