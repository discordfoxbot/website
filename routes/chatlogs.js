let app = require('express').Router();

let config;
try {
    config = require('../config');
} catch (e) {
    config = {datadog: process.env.DATADOG_KEY, cdnUrl: process.env.CDNURL, httpPort: process.env.PORT}
}

app.get('/', (req, res) => {
    res.render('chatlog/index', {
        pagetitle: 'ChatLogs',
        header: {button: [{link: '/', text: 'Home'}]},
        cdnurl: config.cdnUrl
    });
});

app.get('/:id', (req, res, next) => {
    if (req.params.id === '_404_') next(404);
    else res.render('chatlog/log', {
        logid: req.params.id,
        header: {button: [{link: '/', text: 'Home'}]},
        cdnurl: config.cdnUrl
    });
});

module.exports = app;