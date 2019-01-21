module.exports = class Playlist extends require('./AbstractPlayer') {
    constructor(path, filedata, init) {
        super(path[0], filedata,init);
        this.paths = path;
        this.index = 0;
    }

    play(vol, callback) {
        this.path = this.paths[this.index];
        super.play(vol, (function(callback) {
            callback();
        }).bind(this, callback));
        console.log(this.engine);
        this.engine.on("playstop", (function() {
            console.log("stopped");
        }).bind(this));
    }

    addTrack(path) {
        super.addTrack(path);
        this.paths.push(path);
    }
};