import BasePlayer from './basePlayer';

export default class SongzaPlayer extends BasePlayer {
  initialize() {
    this._initEvents();
  }

  get name() {
    return 'Songza';
  }

  play() {
    this._click('.miniplayer-control-play-pause');
  }

  getCurrentSong() {
    return new Promise(async (resolve) => {
      const app = await this._getApp();
      const player = app.getPlayer();

      if (!player) {
        return resolve(null);
      }

      const song = player.model.get('current');
      resolve(this._serializeSong(song));
    });
  }

  nextSong() {
    this._click('.miniplayer-control-skip');
  }

  async _initEvents() {
    const app = await this._getApp();

    app.on({
      'player-song-play': this._onSongPlay,
      'player-song-started': this._onSongPlay
    }, this);
  }

  _onSongPlay({ song }) {
    this.nowPlaying(this._serializeSong(song));
  }

  _getApp() {
    if (!this._playerPromise) {
      this._playerPromise = new Promise((resolve) => {
        // Avoid WebPack interfering with AMD `require` call
        const req = window.require;
        req(['songza/app'], (App) => resolve(App.getInstance()));
      });
    }

    return this._playerPromise;
  }

  _serializeSong(song) {
    if (!song) {
      return null;
    }

    return {
      title: song.get('title'),
      artist: song.get('artist'),
      icon: song.get('image_url')
    };
  }
}
