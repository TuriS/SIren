module.exports = class Playlist extends require('./AbstractPlayer') {
    init() {
        this.index = 0;
        if((typeof this.path) == "string" ) {
            this.paths = this.path;
            this.path = this.paths[0];
        }
    }
};