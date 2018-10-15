const express = require('express'),
    router = express.Router(),
    modules = require("../modules"),
    player = modules.player;
    fm = modules.filemanager;


router.post('/saveFile', function(req, res, next) {
    fm.saveFile(req.body.name, req.body.data);
    res.status(200).send("OK");
});

router.post('/setVolume/:id/:value', function(req, res) {
    player.setVolume(req.params.id, req.params.value);
    res.status(200).send("OK");
});

router.post('/start/:id', function(req, res, next) {
    let id = player.start(req.params.id);
    res.status(200).send(id.toString()).end();
});


router.post('/stop/:id', function(req, res, next) {
    player.stop(req.params.id);
    res.status(200).send("OK");
});

module.exports = router;
