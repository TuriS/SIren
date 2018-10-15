const path = require('path');

function requireInt(name) {
    let modPath = path.join(__dirname, 'modules', name, 'index');
    return require(modPath);
}

module.exports = {
    player: requireInt("player"),
    filemanager: requireInt("filemanager")
};