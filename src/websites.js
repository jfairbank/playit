const websites = ((sites) => {
  for (let root in sites) { sites[`www.${root}`] = sites[root]; }
  return sites;
})({
  'songza.com'() {
    toggleSingle('.miniplayer-control-play-pause');
  },

  'pandora.com'() {
    toggle('.playButton', '.pauseButton');
  },

  'last.fm'() {
    toggle('#radioControlPlay', '#radioControlPause');
  }
});

function toggleSingle(selector) {
  document.querySelector(selector).click();
}

function toggle(playSelector, pauseSelector) {
  const playButton = document.querySelector(playSelector);
  const pauseButton = document.querySelector(pauseSelector);

  if (isHidden(playButton)) {
    pauseButton.click();
  } else {
    playButton.click();
  }
}

function isHidden(el) {
  return window.getComputedStyle(el).display === 'none';
}

export function run(hostname, cb) {
  const play = websites[hostname];

  if (play) {
    cb(play);
  }
}
