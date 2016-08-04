var app = require('express').Router();

app.get('/', (req, res)=> {
    res.render('dmca', {pagetitle: 'DCMA', header: {button: [{link: '/', text: 'Home'}]}})
});

module.exports = app;