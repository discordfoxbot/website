var app = require('express').Router();
var Promise = require('bluebird');

var db = require('../db');
var config = require('../config');

app.get('/', (req, res)=> {
    res.render('chatlog/index', {pagetitle: 'ChatLogs', header: {button: [{link: '/', text: 'Home'}]},cdnurl:config.cdn_url});
});

app.get('/:id', (req, res, next)=> {
    db.models.ChatLog.find({where: {id: req.params.id}}).then(log=> {
        if (log !== null && log !== undefined) {
            log.getChatLogMessages({order: [['timestamp', 'ASC']]}).then(msgs=> {
                Promise.join(log.getChannel(), log.getUser(), log.getGuild(), (channel, user, guild)=> {
                    res.render('chatlog/log', {
                        msgs,
                        user,
                        channel,
                        guild,
                        log,
                        header: {button: [{link: '/', text: 'Home'}]},
                        cdnurl:config.cdn_url
                    });
                });
            });
        } else next(404);
    });
});

module.exports = app;