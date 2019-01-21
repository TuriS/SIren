/* globals ROOTDIR:true */
/**
 * Main file of Player
 */

const MPlayer = require('mplayer'),
    fs = require('fs'),
    AudioPlayer = require('./lib/AudioPlayer'),
    Playlist = require('./lib/Playlist'),
    Sound = require('./lib/Sound'),
    mm = require('musicmetadata');

function getFileData(path) {
    if((typeof path) === "string") {
        return mm(fs.createReadStream(path), function (err, metadata) {
            if (err) { 
                console.log(err); return;
            }
            console.log(metadata);
            return metadata;
        });
    }
}

module.exports = class Player {
    constructor(saveFile) {
        this.players = {};
        this.saveFile = saveFile; 
        this.setPlayers(require(saveFile));
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
        this.players[id].volume = value;
        player.volume(parseInt(value));
    }

    start(id, volume, callback) {
        if(this.players[id]) {
            this.players[id].player.play(volume, callback);
            return id;
        } else return;
    }

    stop(id, callback) {
        let player = this.players[id].player;
        player.stop(callback);
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
        let filedata = getFileData(audio.path);
        switch(audio.type.toLowerCase()) {
        case("music"):
            audio.player = new AudioPlayer(audio.path, filedata, config);
            this.players[id] = audio;
            break;
        case("playlist"):
            audio.player = new Playlist(audio.path, filedata, config);
            this.players[id] = audio;
            break;
        case("sound"):
            audio.player = new Sound(audio.path, filedata, config);
            this.players[id] = audio;
            break;
        }
    }
    save() {
        let saveObject = Object.assign({}, this.players);
        console.log(JSON.stringify(saveObject, null, 2));
        let saveArray = Object.keys(this.players).map(object => {
            let toSave = Object.assign({}, saveObject[object]);
            delete toSave.player;
            return toSave;
        });
        fs.writeFileSync(this.saveFile, JSON.stringify(saveArray, null, 2));
    }
    addTrack(id, path) {
        if(!id || !path) return;
        let player = this.players[id];
        if(!player) return;
        player.player.addTrack(path);
    }
};