var app = require('express').Router();

app.get('/', (req, res)=> {
    res.render('dmca', {pagetitle: 'DMCA', header: {button: [{link: '/', text: 'Home'}]}})
});

module.exports = app;