import {createWebSocket} from './ws-client';

const ws = createWebSocket();
const button = document.querySelector('#play-pause-button');

button.addEventListener('click', () => {
  ws.send('remote-play');
});
