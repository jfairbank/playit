import WebSocket from 'ws';

const port = 3000;
const ip = '<insert your local ip>';
const url = `ws://${ip}:${port}`;
const ws = new WebSocket(url);

// Songza
/*
ws.onmessage = (e) => {
  if (e.data === 'play') {
    jQuery('.miniplayer-control-play-pause').click();
  }
};
*/

// Pandora
/*
ws.onmessage = (e) => {
  if (e.data === 'play') {
    let $playButton = jQuery('.playButton');
    let $pauseButton = jQuery('.pauseButton');

    if ($playButton.is(':hidden')) {
      $pauseButton.click();
    } else {
      $playButton.click();
    }
  }
};
*/
