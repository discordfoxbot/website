let app = require('express').Router(),
    config = require('../config');

app.get('/', (req, res) => {
    res.render('dmca', {pagetitle: 'DMCA', header: {button: [{link: '/', text: 'Home'}]}, cdnurl: config.cdnUrl});
});

module.exports = app;