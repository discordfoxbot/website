let metrics = require('datadog-metrics');

let config;
try {
    config = require('./config');
} catch (e) {
    config = {datadog: process.env.DATADOG_KEY, cdnUrl: process.env.CDNURL, httpPort: process.env.PORT}
}

process.env.DATADOG_API_KEY = config.datadog;

metrics.init({apiKey: config.datadog, host: 'kitsune.fuechschen.org', prefix: 'kitsune.web.'});

module.exports = metrics;