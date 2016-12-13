var DB = require('kitsune-db');

var config = require('./config');

var db = new DB(config.db);

module.exports = db;