/* globals MODULES: true */
const express = require('express'),
    router = express.Router(),
    fm = MODULES.filemanager,
    player = new MODULES.player(require("../soundfiles.json"));

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
    let id = player.start(req.params.id, req.body.volume ? parseInt(req.body.volume): null );
    res.status(200).send(id ? id.toString(): null).end();
});


router.post('/stop/:id', function(req, res, next) {
    player.stop(req.params.id);
    res.status(200).send("OK");
});

router.get('/players', function(req,res,next) {
    res.json(player.getPlayers());
});

module.exports = router;
