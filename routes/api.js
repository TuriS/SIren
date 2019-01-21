/* globals MODULES: true, ROOTDIR: true */
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    os = require('os'),
    fm = MODULES.filemanager,
    player = new MODULES.player(path.join(ROOTDIR, "soundfiles.json")),
    config = require(path.join(ROOTDIR, "config.json"));

router.get('/soundfiles', function(req,res,next) {
    res.json(player.getPlayers());
});

router.post('/saveFile', function(req, res, next) {
    fm.saveFile(req.body.name, req.body.data);
    res.status(200).send("OK");
});

router.post('/setVolume/:id/:value', function(req, res) {
    player.setVolume(req.params.id, req.params.value);
    res.status(200).send("OK");
});

router.post('/start/:id', function(req, res, next) {
    res.status(200).send("OK").end();
    let id = player.start(req.params.id, req.body.volume ? parseInt(req.body.volume): null , function() {
        console.log("done");
        
    });
    
});


router.post('/stop/:id', function(req, res, next) {
    player.stop(req.params.id, function() {
        res.status(200).send("OK");
    });
});

router.post('/save', function(req, res, next) {
    player.save();
    res.status(200).end();
});

router.get('/players', function(req,res,next) {
    res.json(player.getPlayers());
});

router.get('/filetree', async function(req,res,next) {
    let filetree = fm.getFileTree(path.join(os.homedir(), "Musik"));
    console.log(filetree);
    res.json(filetree);
});

router.post('/addtrack/:id', function(req, res, next) {
    console.log(req.params);
    console.log(req.body);
    player.addTrack(req.params.id, req.body.path);
    res.status(200).end();
});

module.exports = router;
