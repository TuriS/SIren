const MPlayer = require('mplayer');

module.exports = class AbstractPlayer {
    constructor(path, filedata, config) {
        this.engine = new MPlayer();
        this.path = path;
        this.filedata = filedata;
        this.config = config;
    }
    play(vol, callback) {
        this.engine.openFile(this.getPath());
        this.fade(0,vol, (function(callback) { 
            callback();
        }).bind(this, callback));
    }
    pause() {

    }
    stop(callback) {
        this.fade(this.engine.status.volume,0, (function(callback){
            this.engine.stop();
            callback();
        }).bind(this, callback));
    }
    volume(val) {
        this.engine.volume(val);
    }
    getPath() {
        return this.path;
    }
    fade(volStart, volEnd, callback) {
        let duration = 5000;
        this.volume(volStart);
        let delta = Math.abs(volEnd-volStart);
        if (delta === 0) {
            callback();
        }

        let timestep = duration / delta;
        let volume = volStart;
        let up = volEnd > volStart;
        for(let i = 0; i < delta; i++) {
            setTimeout((function(callback) {
                this.volume(up ? volume++ : volume--);
                if(i==delta -1) {
                    callback();
                }
            }).bind(this, callback), i * timestep);
        }
    }
    addTrack(path) {
        console.log(path);
        this.path = path;
    }
};