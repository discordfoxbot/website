let app = require('express').Router();

let config;
try {
    config = require('../config');
} catch (e) {
    config = {datadog: process.env.DATADOG_KEY, cdnUrl: process.env.CDNURL, httpPort: process.env.PORT}
}

app.get('/', (req, res) => {
    res.render('dmca', {pagetitle: 'DMCA', header: {button: [{link: '/', text: 'Home'}]}, cdnurl: config.cdnUrl});
});

module.exports = app;