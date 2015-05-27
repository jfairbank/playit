import isEqual from 'lodash/lang/isEqual';
import BasePlayer from './basePlayer';

export default class PandoraPlayer extends BasePlayer {
  constructor() {
    super();
    this._pollForCurrentSong();
  }

  getName() {
    return 'Pandora';
  }

  play() {
    this._toggle('.playButton', '.pauseButton');
  }

  isPlaying() {
    return this._isHidden(document.querySelector('.playButton'));
  }

  nextSong() {
    this._click('.skipButton');
  }

  getCurrentSong() {
    return Promise.resolve(this._currentSong || this._getCurrentPlayingSong());

    //if (!this._currentSongPromise) {
      //this._currentSongPromise = new Promise((resolve) => {
        //const helper = () => {
          //if (this._currentSong) {
            //resolve(this._currentSong);
          //} else {
            //setTimeout(helper, 1000);
          //}
        //};

        //helper();
      //});
    //}

    //return this._currentSongPromise;
  }

  _getCurrentlyPlayingSong() {
    const title = this._getElAttr('.playerBarSong', 'textContent').trim();
    const artist = this._getElAttr('.playerBarArtist', 'textContent').trim();
    const icon = this._getElAttr('.playerBarArt', 'src');

    if (!title || !artist || !icon) {
      return null;
    }

    return { title, artist, icon };
  }

  _getElAttr(selector, attr) {
    const el = document.querySelector(selector);
    return el && el[attr] || '';
  }

  _pollForCurrentSong() {
    const song = this._getCurrentlyPlayingSong();

    if (!isEqual(this._currentSong, song)) {
      this._currentSong = song;

      if (song) {
        this.emit('next-song', song);
      }
    }

    setTimeout(this._pollForCurrentSong.bind(this), 5000);
  }
}
