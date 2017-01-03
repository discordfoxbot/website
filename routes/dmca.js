var app = require('express').Router();
var config = require('../config');

app.get('/', (req, res) => {
    res.render('dmca', {pagetitle: 'DMCA', header: {button: [{link: '/', text: 'Home'}]}, cdnurl: config.cdn_url})
});

module.exports = app;