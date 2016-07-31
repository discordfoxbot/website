module.exports = {
    language: 'en',
    commands: {
        help: {
            usage: '&{command}',
            alias: null,
            description: 'Displays a general helptext.',
            perm: 0
        },
        nick: {
            usage: '&{command} [nick]',
            alias: null,
            description: 'Changes the nickname of the bot for the guild it is executed on. Use \'reset\' to reset the nickname.',
            perm: 3
        },
        prefix: {
            usage: '&{command}',
            alias: null,
            description: 'Displays all available prefixes for the guild.',
            perm: 0,
            subcommands: {
                add: {
                    usage: '&{command} [prefix]',
                    alias: null,
                    description: 'Adds a prefix to the guild.',
                    perm: 3
                },
                remove: {
                    usage: '&{command} [prefix]',
                    alias: null,
                    description: 'Removes a prefix from the guild.',
                    perm: 3
                }
            }
        },
        purge: {
            usage: '&{command} (count)',
            alias: null,
            description: 'Deletes the the ammount of messages given in count from the channel it is executed in. Count defaults to 25.',
            perm: 3
        },
        cat: {
            usage: '&{command}',
            alias: ['kitty', 'kitten'],
            description: 'Send a cute cat picture.',
            perm: 0
        },
        smile: {
            usage: '&{command}',
            alias: null,
            description: 'Smiles :D',
            perm: 0
        },
        wtf: {
            usage: '&{command}',
            alias: null,
            description: 'WHTAT THE FUCK!',
            perm: 0
        },
        stats: {
            usage: '&{command}',
            alias: null,
            description: 'Displays some stats of FoxBot.',
            perm: 0,
            subcommands: {
                guild: {
                    usage: '&{command}',
                    alias: ['server'],
                    description: 'Displays some stats over the guild FoxBot has collected.',
                    perm: 0
                }
            }
        },
        watcher: {
            usage: '&{command}',
            alias: ['twitchwatcher'],
            description: 'Displays current watchers for the channel used.',
            perm: 0,
            subcommands: {
                add: {
                    usage: '&{command} [channel]',
                    alias: null,
                    description: 'Adds a watcher for the specified twitchchannel. Streammessages will be sent to the channel the command was used in.',
                    perm: 2
                },
                remove: {
                    usage: '&{command} [channel]',
                    alias: null,
                    description: 'Removes the watcher for the specified twitchchannel.',
                    perm: 2
                }
            }
        },
        waifu: {
            usage: '&{command}',
            alias: null,
            description: 'Displays a picture of your current waifu (or/and randomly assigns you one if you don\'t have one registerd.)',
            perm: 0,
            subcommands: {
                id: {
                    usage: '&{command}',
                    alias: null,
                    description: 'Returns the internal ID of your current waifu.',
                    perm: 0
                },
                list: {
                    usage: '&{command}',
                    alias: null,
                    description: 'Returns a list for all available waifus.',
                    perm: 0
                },
                search: {
                    usage: '&{command} [name]',
                    alias: null,
                    description: 'Searches for a waifu in FoxBot\'s internal database',
                    perm: 0
                },
                set: {
                    usage: '&{command} [id]',
                    alias: null,
                    description: 'Sets your waifu.',
                    perm: 0
                },
                addpicture: {
                    usage: '&{command} (id) [picture link]',
                    alias: null,
                    description: 'Adds a picture to your waifu (or the waifu specified in the id). Pictures will be uploaded to gg.fuechschen.org and be queued for verification through one of FoxBot\'s managers.',
                    perm: 0
                }
            }
        },
        husbando: {
            usage: '&{command}',
            alias: null,
            description: 'Displays a picture of your current husbando (or/and randomly assigns you one if you don\'t have one registerd.)',
            perm: 0,
            subcommands: {
                id: {
                    usage: '&{command}',
                    alias: null,
                    description: 'Returns the internal ID of your current husbando.',
                    perm: 0
                },
                list: {
                    usage: '&{command}',
                    alias: null,
                    description: 'Returns a list for all available husbandos.',
                    perm: 0
                },
                search: {
                    usage: '&{command} [name]',
                    alias: null,
                    description: 'Searches for a husbando in FoxBot\'s internal database',
                    perm: 0
                },
                set: {
                    usage: '&{command} [id]',
                    alias: null,
                    description: 'Sets your husbando.',
                    perm: 0
                },
                addpicture: {
                    usage: '&{command} (id) [picture link]',
                    alias: null,
                    description: 'Adds a picture to your husbando (or the husbando specified in the id). Pictures will be uploaded to gg.fuechschen.org and be queued for verification through one of FoxBot\'s managers.',
                    perm: 0
                }
            }
        },
        chatlog: {
            usage: '&{command}',
            alias: null,
            description: 'Displays a short helptext for chatlogs.',
            perm: 0,
            subcommands: {
                create: {
                    usage: '&{command} (count)',
                    alias: null,
                    description: 'Creates a chatlog of the last messages specified in count and returns a link for it.'
                }
            }
        },
        commands: {
            usage: '&{command}',
            alias: null,
            description: 'Dispalys to link to the command page',
            perm: 0
        }
    }
};