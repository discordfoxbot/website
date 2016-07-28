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
        purge:{
            usage:'&{command} (count)',
            alias:null,
            description:'Deletes the the ammount of messages given in count from the channel it is executed in. Count defaults to 25.',
            perm:3
        },
        cat:{
            usage: '&{command}',
            alias:['kitty','kitten'],
            description: 'Send a cute cat picture.',
            perm:0
        },
        smile:{
            usage:'&{command}',
            alias:null,
            description:'Smiles :D',
            perm:0
        },
        wtf:{
            usage:'&{command}',
            alias:null,
            description:'WHTAT THE FUCK!',
            perm:0
        },
        stats:{
            usage:'&{command}',
            alias:null,
            description:'Displays some stats of FoxBot.',
            perm:0,
            subcommands:{
                guild:{
                    usage:'&{command}',
                    alias:['server'],
                    description:'Displays some stats over the guild FoxBot has collected.',
                    perm:0
                }
            }
        }
    }
};