import webpack from 'webpack';
import express from 'express';
import {Server as WebSocketServer} from 'ws';

const httpPort = 8080;
const wsPort = 3000;
const mediakeys = require('mediakeys').listen();

function compile() {
  function noop() {}

  const commonConfig = {
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  };

  const remoteConfig = Object.assign({
    entry: __dirname + '/remote.js',
    output: {
      path: __dirname + '/../public',
      filename: 'remote.js'
    }
  }, commonConfig);

  const clientConfig = Object.assign({
    entry: __dirname + '/client.js',
    output: {
      path: __dirname + '/../dist',
      filename: 'client.js'
    }
  }, commonConfig);

  webpack(remoteConfig).run(noop);
  webpack(clientConfig).run(noop);
}

function runWebServer() {
  const app = express();

  app.use(express.static(__dirname + '/../public'));

  app.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort}...`);
  });
}

function runWebSocketServer() {
  const wss = new WebSocketServer({ port: wsPort });

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

  console.log(`Web socket server listening on port ${wsPort}...`);
}

compile();
runWebServer();
runWebSocketServer();
