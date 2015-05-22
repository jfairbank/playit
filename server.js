import {Server as WebSocketServer} from 'ws';
//import webdriver from 'selenium-webdriver';

const port = 3000;
const wss = new WebSocketServer({ port });
const mediakeys = require('mediakeys').listen();

//const driver = (new webdriver.Builder())
  //.forBrowser('chrome')
  //.build();

wss.on('connection', (ws) => {
  const play = ws.send.bind(ws, 'play');

  mediakeys.on('play', play);

  ws.on('close', () => mediakeys.removeListener('play', play));
});

console.log(`Listening on port ${port}`);

//driver.get('http://songza.com');
//driver.executeScript('alert("foo");');
