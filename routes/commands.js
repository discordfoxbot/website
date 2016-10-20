var app = require('express').Router();

var config = require('../config');

var commands = require('../data/commands').commands;
var list = (() => {
    var list = [];
    var keys = Object.keys(commands);
    keys.forEach((key)=> {
        commands[key].name = key;
        commands[key].usage = commands[key].usage({command: commands[key].name});
        list.push({link: commands[key].name, name: commands[key].name});
        if (commands[key].subcommands !== undefined) {
            commands[key].sublist = (() => {
                var sublist = [];
                var keys = Object.keys(commands[key].subcommands);
                keys.forEach((subkey)=> {
                    commands[key].subcommands[subkey].name = subkey;
                    commands[key].subcommands[subkey].usage = commands[key].subcommands[subkey].usage({command: `${key} ${subkey}`});
                    sublist.push({
                        name: commands[key].subcommands[subkey].name,
                        link: `${commands[key].name}/${commands[key].subcommands[subkey].name}`
                    });
                    list.push({
                        name: `${commands[key].name} ${commands[key].subcommands[subkey].name}`,
                        link: `${commands[key].name}/${commands[key].subcommands[subkey].name}`
                    });
                });
                return sublist;
            })()
        }
    });
    return list;
})();

app.get('/', (req, res)=> {
    res.render('commands/index', {
        pagetitle: 'Kitsune Commands',
        header: {
            title: 'Kitsune',
            subtitle: 'A fully featured DiscordBot',
            button: [{link: '/', text: 'Home'}]
        },
        commands: list,
        cdnurl: config.cdn_url
    });
});

app.get('/:command', (req, res, next)=> {
    if (commands[req.params.command] !== undefined) {
        res.render('commands/command', {
            pagetitle: req.params.command,
            header: {
                button: [{link: '/commands', text: 'Commands'}, {link: '/', text: 'Home'}]
            },
            command: commands[req.params.command],
            subcommands: commands[req.params.command].sublist,
            cdnurl: config.cdn_url
        });
    } else next(404);
});

app.get('/:command/:subcommand', (req, res, next)=> {
    if (commands[req.params.command]) {
        if (commands[req.params.command].subcommands[req.params.subcommand] !== undefined) {
            res.render('commands/command', {
                pagetitle: `${req.params.command} ${req.params.subcommand}`,
                header: {
                    title: 'Kitsune',
                    subtitle: 'A fully featured DiscordBot',
                    button: [{link: '/commands', text: 'Commands'}, {link: '/', text: 'Home'}]
                },
                command: commands[req.params.command].subcommands[req.params.subcommand],
                cdnurl: config.cdn_url
            });
        } else next(404);
    } else next(404);
});

module.exports = app;