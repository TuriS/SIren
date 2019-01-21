/* globals MODULES:true*/
const express = require('express'),
    router = express.Router(),
    soundfiles = require('../soundfiles.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Siren'});
});

module.exports = router;
