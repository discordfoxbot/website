let app = require('express').Router();

app.use('/errors', require('./errors'));

module.exports = app;