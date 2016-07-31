var redis = require('../db').redis;
var Cron = require('cron').CronJob;

var exprt = {
    guilds: 0,
    channels: 0,
    users: 0,
    mpm: 0
};

redis.hgetall('stats').then((stats)=> {
    exprt.guilds = stats.guilds;
    exprt.channels = stats.channels;
    exprt.users = stats.users;
    exprt.mpm = stats.mpm;
});

new Cron('0 */10 * * * *', ()=> {
    redis.hgetall('stats').then((stats)=> {
        exprt = stats;
    })
}, null, true);

module.exports = ()=> {
    return exprt
};