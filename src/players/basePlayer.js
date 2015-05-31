import { EventEmitter } from 'events';

export default class BasePlayer extends EventEmitter {
  static create() {
    return new this();
  }

  constructor() {
    super();
    this.initialize();
  }

  initialize() {}

  nowPlaying(song) {
    if (song) {
      this.emit('now-playing', song);
    }
  }

  async checkNowPlaying() {
    const song = await this.getCurrentSong();
    this.nowPlaying(song);
  }

  _click(selector) {
    document.querySelector(selector).click();
  }

  _toggle(playSelector, pauseSelector) {
    const playButton = document.querySelector(playSelector);
    const pauseButton = document.querySelector(pauseSelector);

    if (this._isHidden(playButton)) {
      pauseButton.click();
    } else {
      playButton.click();
    }
  }

  _isHidden(el) {
    return window.getComputedStyle(el).display === 'none';
  }
}
