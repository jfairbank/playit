import isPlainObject from 'lodash/lang/isPlainObject';
import isFunction from 'lodash/lang/isFunction';
import Promise from 'bluebird';

import SongzaPlayer from './players/songzaPlayer';
import PandoraPlayer from './players/pandoraPlayer';

const players = ((ps) => {
  for (let root in ps) { ps[`www.${root}`] = ps[root]; }
  return ps;
})({
  'songza.com': SongzaPlayer,
  'pandora.com': PandoraPlayer
});

export function getForHost(hostname, cb) {
  const Player = players[hostname];

  if (Player) {
    cb(Player.create());
  }
}

//const websites = ((sites) => {
  //for (let root in sites) { sites[`www.${root}`] = sites[root]; }
  //return sites;
//})({
  //'songza.com': {
    //play() {
      //toggleSingle('.miniplayer-control-play-pause');

      //if (this._isPlaying()) {
        //this._getPlayer().then((player) => {
          //this._nowPlaying(player.get('current'));
        //});
      //}
    //},

    //getCurrentSong() {
      //return this._getPlayer().then((player))
    //}

    //setup(ws) {
      //this._ws = ws;

      //this._getPlayer().then((player) => {
        //this._nowPlaying(player.get('current'));

        //player.on('change:current', (_, song) => {
          //if (song) {
            //this._nowPlaying(song);
          //}
        //});
      //});
    //},

    //_isPlaying() {
      //return isHidden(document.querySelector('.miniplayer-control-play-pause .ui-icon-ios7-play'));
    //},

    //_getPlayer() {
      //if (!this._playerPromise) {
        //this._playerPromise = new Promise((resolve) => {
          //// Avoid WebPack interfering with AMD `require` call
          //const req = window.require;
          //req(['songza/app'], (App) => {
            //resolve(App.getInstance().getPlayer().model);
          //});
        //});
      //}

      //return this._playerPromise;
    //},

    //_nowPlaying(song) {
      //this._ws.nowPlaying({
        //website: 'Songza',
        //title: `${song.get('title')} by ${song.get('artist')}`,
        //icon: song.get('image_url')
      //});
    //}
  //},

  //'pandora.com'() {
    //toggle('.playButton', '.pauseButton');
  //},

  //'last.fm'() {
    //toggle('#radioControlPlay', '#radioControlPause');
  //}
//});

//function toggleSingle(selector) {
  //document.querySelector(selector).click();
//}

//function toggle(playSelector, pauseSelector) {
  //const playButton = document.querySelector(playSelector);
  //const pauseButton = document.querySelector(pauseSelector);

  //if (isHidden(playButton)) {
    //pauseButton.click();
  //} else {
    //playButton.click();
  //}
//}

//function isHidden(el) {
  //return window.getComputedStyle(el).display === 'none';
//}

//export function run(hostname, cb) {
  //const website = websites[hostname];
  //let play, setup = function() {};

  //if (isFunction(website)) {
    //play = website;
  //} else {
    //play = website.play.bind(website);

    //if (website.setup) {
      //setup = website.setup.bind(website);
    //}
  //}

  //if (play) {
    //cb(setup, play);
  //}
//}
