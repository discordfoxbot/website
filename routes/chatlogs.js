var app = require('express').Router();
var config = require('../config');

app.get('/', (req, res) => {
    res.render('chatlog/index', {
        pagetitle: 'ChatLogs',
        header: {button: [{link: '/', text: 'Home'}]},
        cdnurl: config.cdn_url
    });
});

app.get('/:id', (req, res, next) => {
    if (req.params.id === '_404_') next(404);
    else res.render('chatlog/log', {
        logid: req.params.id,
        header: {button: [{link: '/', text: 'Home'}]},
        cdnurl: config.cdn_url
    });
});

module.exports = app;