const fs = require('fs'),
    path = require('path'),
    SAVE_DIR = path.join(__dirname, 'data');

function dirTree(filename) {
    let stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };
    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        info.type = "file";
    }

    return info;
}

module.exports = {
    getFileTree: dirTree,
    saveFile: function(name, data) {
        let file = path.join(SAVE_DIR, name);
        fs.writeFileSync(file, JSON.stringify(data), {encoding: 'utf8'});
    },
    openFile: function(name) {
        let file = path.join(SAVE_DIR, name);
        let data = fs.readFileSync(file, {encoding: 'utf8'});
        return JSON.parse(data);
    }
}