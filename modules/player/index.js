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
        console.log(this.players);
    }
    pause(id) {
        if(!id || !this.players[id]) return;
        let player = this.players[id];
        player.stop();
    }

    setVolume(id, value) {
        if(!id || ! value) return;
        if(!this.players[id]) return;
        let player = this.players[id];
        player.volume(parseInt(value));
    }

    start(id, config) {
        id = id ? id : Object.keys(players).length;
        if(players[id]) {
            console.log(this.players[id]);
            players[id].play();
            return id;
        }
        let player = new MPlayer();
        this.players[id]= player;
        // player.on('status', console.log);
        player.setOptions({
            cache: 128,
            cacheMin: 1,
            volume: config.volume
        });
        if(config.type == "playlist") {
            player.openPlaylist(config.path);
            return id;
        }
        player.openFile(config.path);
        return id;
    }

    stop(id) {
        let player = this.players[id];
        player.stop();
    }

    stopAll() {
        Object.keys(this.players).forEach(player => {
            players[player].stop();
            delete players[player];
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
        let id =  Date.now().toString(16);
        while(this.players[id]) {
            id = (Date.now() + 1).toString(16);
        }
        switch(audio.type.toLowerCase()) {
            case("music"):
                audio.player = new AudioPlayer();
                this.players[id] = audio;
                break;
            case("playlist"):
                audio.player = new Playlist();
                this.players[id] = audio;
                break;
            case("sound"):
                audio.player = new Sound();
                this.players[id] = audio;
                break;
        }
    }
};