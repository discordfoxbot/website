var app = require('express').Router();
var config = require('../config');

app.get('/:type', (req, res) => {
    res.render('index', {cdnurl: config.cdn_url});
});

module.exports = app;