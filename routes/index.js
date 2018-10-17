/* globals MODULES:true*/
const express = require('express'),
    router = express.Router(),
    fm = MODULES.filemanager,
    path = require('path'),
    fs = require('fs'),
    config = require('../config.json'),
    soundfiles = require('../soundfiles.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Siren', soundfiles: soundfiles });
});

module.exports = router;
