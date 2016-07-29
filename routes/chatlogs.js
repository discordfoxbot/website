var app = require('express').Router();
var Promise = require('bluebird');

var db = require('../db/sql_db');

app.get('/:id', (req, res, next)=> {
    db.models.ChatLog.find({where: {id: req.params.id}}).then(log=> {
        if (log !== null && log !== undefined) {
            log.getChatLogMessages({order: [['timestamp', 'ASC']]}).then(msgs=> {
                Promise.join(log.getChannel(), log.getUser(), log.getGuild(), (channel, user, guild)=> {
                    res.render('chatlog/log', {msgs, user, channel, guild, log});
                });
            });
        } else next(404);
    });
});

module.exports = app;