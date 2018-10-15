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
    start: function(id, config) {
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
            cacheMin: 1,
            volume: config.volume
        });
        player.openFile(config.path);
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