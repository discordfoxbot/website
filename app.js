process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var storyboard = require('storyboard');
var S = require('string');

var story = storyboard.mainStory;
storyboard.addListener(require('storyboard/lib/listeners/console').default);

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', ['loopback']);

app.use(logger('short', {
    stream: {
        write: (toLog) => {
            story.info('http', S(toLog).chompRight('\n').s)
        }
    }
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/characters', require('./routes/characters'));
app.use('/commands', require('./routes/commands'));
app.use('/chatlogs', require('./routes/chatlogs'));
app.use('/dmca', require('./routes/dmca'));

app.get('/', (req, res)=> {
    res.render('index', {
        pagetitle: 'FoxBot',
        header: {
            title: 'Foxbot',
            subtitle: 'A fully featured DiscordBot',
            button: [{link: '/commands', text: 'Commands'}, {link: '/chatlogs', text: 'Chatlogs'}]
        },
        cdnurl: config.cdn_url
    });
});

app.get('/invite', (req, res)=> {
    res.redirect('https://discordapp.com/oauth2/authorize?access_type=online&client_id=168751105558183936&scope=bot&permissions=67464192')
});

app.get('/issues', (req, res)=> {
    res.redirect('https://github.com/discordfoxbot/bot/issues');
});

app.get('/repo', (req, res)=> {
    res.redirect('https://github.com/discordfoxbot/bot')
});

app.use((req, res, next)=> {
    next(404)
});

app.use((err, req, res, next) => {
    if (typeof err === 'number') {
        var msg = '';
        switch (err) {
            case 404:
                msg = 'Page not found';
                break;
            default:
                msg = 'An error occurred.';
                break;
        }
        res.status(err).render('error', {code: err, message: msg});
    } else res.status(500).render('error', {code: 500, message: 'Internal Server Error', excuse: true});
    story.error('http', 'Http reported an error.', {attach: err});
});

app.listen(4236);
