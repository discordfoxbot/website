let metrics = require('datadog-metrics'),
    config = require('./config');

process.env.DATADOG_API_KEY = config.datadog;

metrics.init({apiKey: config.datadog, host: 'kitsune.fuechschen.org', prefix: 'kitsune.web.'});

module.exports = metrics;