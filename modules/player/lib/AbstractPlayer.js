const MPlayer = require('mplayer');

module.exports = class AbstractPlayer {
    constructor(path, config) {
        let player = new MPlayer();

        this.engine = player;
        this.file = path;
        this.config = config;
    }
    play() {

    }
    pause() {

    }
    stop() {

    }
}