let metrics = require('datadog-metrics'),
    config = require('./config');

metrics.init({apiKey: config.datadog, host: 'kitsune.fuechschen.org', prefix: 'kitsune.web.'});

module.exports = metrics;