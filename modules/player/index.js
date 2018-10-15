/**
 * Main file of Player
 */

const MPlayer = require('mplayer');
const players = {};

module.exports = {
    pause: function(id) {
        if(!id || !players[id]) return;
        let player = players[id];
        player.stop();
    },
    setVolume : function(id, value) {
        if(!id || ! value) return;
        if(!players[id]) return;
        let player = players[id];
        player.volume(parseInt(value));
    },
    start: function(id) {
        id = id ? id : Object.keys(players).length;
        if(players[id]) {
            console.log(players[id]);
            // players[id].play();
            return id;
        }

        let player = new MPlayer();
        players[id]= player;
        // player.on('status', console.log);
        player.setOptions({
            cache: 128,
            cacheMin: 1
        });
        player.openFile("/home/turi/Musik/A Thousand Years - Christina Perri.mp3");
        return id;
    },
    stop: function(id) {
        let player = players[id];
        player.stop();
        delete players[id];
    },
    stopAll: function() {
        Object.keys(players).forEach(player => {
            players[player].stop();
            delete players[player];
        });
    },
    players: players

};