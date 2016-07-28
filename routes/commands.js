var app = require('express').Router();

var utils = require('../lib/utils');

var commands = require('../data/commands').commands;
var list = function () {
    var list = [];
    var keys = Object.keys(commands);
    keys.forEach((key)=> {
        commands[key].name = key;
        commands[key].usage = utils.replace(commands[key].usage, {command: commands[key].name});
        if (commands[key].subcommands) {
            commands[key].sublist = function () {
                var list = [];
                var keys = Object.keys(commands[key].subcommands);
                keys.forEach((subkey)=> {
                    commands[key].subcommands[subkey].name = subkey;
                    commands[key].subcommands[subkey].usage = utils.replace(commands[key].subcommands[subkey].usage, {command: key + ' ' + subkey});
                    list.push(commands[key].subcommands[subkey]);
                });
                return list;
            }
        }
        list.push(commands[key]);
    });
    return list;
}();

app.get('/', (req, res)=> {
    res.render('commands/index', {
        pagetitle: 'FoxBot commands', header: {
            title: 'Foxbot',
            subtitle: 'A fully featured DiscordBot',
            button: {
                primary: {link: '/invite', text: 'Add to Guild'},
                secondary: [{link: '/commands', text: 'Commands'}]
            }
        }, commands: list
    });
});

app.get('/:command', (req, res)=> {
    res.render('commands/command', {
        pagetitle: req.params.command,
        header: {
            title: 'Foxbot',
            subtitle: 'A fully featured DiscordBot',
            button: {
                primary: {link: '/invite', text: 'Add to Guild'},
                secondary: [{link: '/commands', text: 'Commands'}]
            }
        }, command: commands[req.params.command],
        subcommands: commands[req.params.command].sublist
    });
});

app.get('/:command/:subcommand', (req, res)=> {

});

module.exports = app;