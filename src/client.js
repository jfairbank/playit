import {createWebSocket} from './ws-client';
import {run as runForHostname} from './websites.js';

runForHostname(document.location.hostname, (play) => {
  const ws = createWebSocket();

  ws.onmessage = ({data}) => {
    if (data === 'play') {
      play();
    }
  };
});
