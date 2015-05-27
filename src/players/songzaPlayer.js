import BasePlayer from './basePlayer';

export default class SongzaPlayer extends BasePlayer {
  constructor() {
    super();
    this._initEvents();
  }

  getName() {
    return 'Songza';
  }

  play() {
    this._click('.miniplayer-control-play-pause');
  }

  isPlaying() {
    return this._isHidden(
      document.querySelector('.miniplayer-control-play-pause .ui-icon-ios7-play')
    );
  }

  getCurrentSong() {
    return this._getPlayer()
      .then((player) => this._serializeSong(player.get('current')));
  }

  nextSong() {
    this._click('.miniplayer-control-skip');
  }

  _initEvents() {
    this._getPlayer().then((player) => {
      player.on('change:current', (_, song) => {
        if (song) {
          this.emit('next-song', this._serializeSong(song));
        }
      });
    });
  }

  _getPlayer() {
    if (!this._playerPromise) {
      this._playerPromise = new Promise((resolve, reject) => {
        // Avoid WebPack interfering with AMD `require` call
        const req = window.require;

        req(['songza/app'], (App) => {
          const playerView = App.getInstance().player;

          if (playerView) {
            resolve(playerView.model);
          } else {
            reject();
            this._playerPromise = null;
          }
        });
      });
    }

    return this._playerPromise;
  }

  _serializeSong(song) {
    return {
      title: song.get('title'),
      artist: song.get('artist'),
      icon: song.get('image_url')
    };
  }
}
