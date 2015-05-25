import webpack from 'webpack';
import express from 'express';
import {Server as WebSocketServer} from 'ws';
import {compile as compileClient} from './client-compile';

const mediakeys = require('mediakeys').listen();

function runWebServer(port) {
  const app = express();

  app.use(express.static(__dirname + '/../public'));

  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}...`);
  });
}

function runWebSocketServer(port) {
  const wss = new WebSocketServer({ port });

  wss.broadcast = (data) => {
    wss.clients.forEach((client) => client.send(data));
  };

  wss.on('connection', (ws) => {
    const play = ws.send.bind(ws, 'play');

    mediakeys.on('play', play);

    ws.on('message', (data) => {
      if (data === 'remote-play') {
        wss.broadcast('play');
      }
    });

    ws.on('close', () => mediakeys.removeListener('play', play));
  });

  console.log(`Web socket server listening on port ${port}...`);
}

export function start(wsPort, httpPort) {
  return compileClient(wsPort).then(() => {
    runWebServer(httpPort);
    runWebSocketServer(wsPort);
  });
}
