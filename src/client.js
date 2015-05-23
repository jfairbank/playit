import {createWebSocket} from './ws-client';

const websites = {
  'songza.com'() {
    jQuery('.miniplayer-control-play-pause').click();
  },

  'pandora.com'() {
    let $playButton = jQuery('.playButton');
    let $pauseButton = jQuery('.pauseButton');

    if ($playButton.is(':hidden')) {
      $pauseButton.click();
    } else {
      $playButton.click();
    }
  }
};

const play = websites[document.location.hostname];

if (play) {
  const ws = createWebSocket();

  ws.onmessage = ({data}) => {
    if (data === 'play') {
      play();
    }
  };
}
