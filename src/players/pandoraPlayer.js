import isEqual from 'lodash/lang/isEqual';
import BasePlayer from './basePlayer';

export default class PandoraPlayer extends BasePlayer {
  initialize() {
    this._pollForCurrentSong();
  }

  get name() {
    return 'Pandora';
  }

  play() {
    this._toggle('.playButton', '.pauseButton');
  }

  nextSong() {
    this._click('.skipButton');
  }

  getCurrentSong() {
    return Promise.resolve(this._currentSong || this._getCurrentPlayingSong());
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
      this.nowPlaying(song);
    }

    setTimeout(::this._pollForCurrentSong, 5000);
  }
}
