const path = require('path'),
    fs = require('fs'),
    modules = fs.readdirSync(path.join(__dirname, 'modules'));

function requireInt(name) {
    let modPath = path.join(__dirname, 'modules', name, 'index');
    return require(modPath);
}

let requires = modules.reduce((acc, cur) => {
    acc[cur] = function() {
        requireInt(cur)
    };
    return acc;
},{});

module.exports = requires;