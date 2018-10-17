/* globals ROOTDIR:true */
/**
 * Main file of Player
 */

const MPlayer = require('mplayer'),
    AudioPlayer = require('./lib/AudioPlayer'),
    Playlist = require('./lib/Playlist'),
    Sound = require('./lib/Sound');

module.exports = class Player {
    constructor(array) {
        this.players = {};
        this.setPlayers(array);
    }
    pause(id) {
        if(!id || !this.players[id]) return;
        let player = this.players[id];
        player.stop();
    }

    setVolume(id, value) {
        if(!id || ! value) return;
        if(!this.players[id]) return;
        
        let player = this.players[id].player;
        player.volume(parseInt(value));
    }

    start(id, volume) {
        if(this.players[id]) {
            this.players[id].player.play(volume);
            return id;
        } else return;
    }

    stop(id) {
        let player = this.players[id].player;
        player.stop();
    }

    stopAll() {
        Object.keys(this.players).forEach(player => {
            this.players[player].stop();
            delete this.players[player];
        });
    }
    getPlayers() {
        return this.players;
    }
    setPlayers(array) {
        array.forEach(audio => {
            this.addPlayer(audio);
        });
    }
    addPlayer(audio) {
        let id = audio.id ? audio.id : Date.now().toString(16);
        while(this.players[id]) {
            id = (Date.now() + 1).toString(16);
        }
        let config = {
            cache: 128,
            cacheMin: 0.5,
            volume: audio.volume
        };
        if(ROOTDIR && !audio.path.toString().startsWith("/")){
            audio.path = ROOTDIR + "/" + audio.path;
        }
        switch(audio.type.toLowerCase()) {
        case("music"):
            audio.player = new AudioPlayer(audio.path, config);
            this.players[id] = audio;
            break;
        case("playlist"):
            audio.player = new Playlist(audio.path,config);
            this.players[id] = audio;
            break;
        case("sound"):
            audio.player = new Sound(audio.path);
            this.players[id] = audio;
            break;
        }
    }
};