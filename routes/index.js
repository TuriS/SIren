const express = require('express'),
    router = express.Router(),
    modules = require('../modules'),
    fm = modules.filemanager,
    path = require('path'),
    fs = require('fs'),
    config = require('../config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(JSON.stringify(fm.getFileTree(config.folders.music), null, 2))
    res.render('index', { title: 'Siren' });
});

module.exports = router;
