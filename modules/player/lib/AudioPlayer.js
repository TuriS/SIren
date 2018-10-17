module.exports = class AudioPlayer extends require('./AbstractPlayer') {
    init() {
        this.engine.setOptions(this.config);
    }
};