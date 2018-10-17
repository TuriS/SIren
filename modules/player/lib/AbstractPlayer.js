const MPlayer = require('mplayer');

module.exports = class AbstractPlayer {
    constructor(path, config) {
        this.engine = new MPlayer();
        this.path = path;
        this.config = config;
        this.init();
    }
    init() {
    }
    play(vol) {
        this.engine.openFile(this.getPath());
        this.volume(vol);
    }
    pause() {

    }
    stop() {
        this.engine.stop();
    }
    volume(val) {
        this.engine.volume(val);
    }
    getPath() {
        return this.path;
    }
};