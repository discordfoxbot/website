process.env.NODE_ENV = 'production';

let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    storyboard = require('storyboard'),
    S = require('string');

let story = storyboard.mainStory;
storyboard.addListener(require('storyboard/lib/listeners/console').default);

let config = require('./config'),
    metrics = require('./metrics');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.cdnurl = config.cdn_url;
app.locals.assets = require('./public/rev-manifest.json');


app.set('trust proxy', ['loopback']);

app.use(logger('short', {
    stream: {
        write: (toLog) => {
            story.info('http', S(toLog).chompRight('\n').s)
        }
    }
}));

app.use((req, res, next) => {
    next();
    metrics.increment('requests', 1, [`route:${req.originalUrl}`, `method:${req.method}`]);
});

app.use('/public', express.static(`${__dirname}/public`));

app.use('/commands', require('./routes/commands'));
app.use('/chatlogs', require('./routes/chatlogs'));
app.use('/dmca', require('./routes/dmca'));
app.use('/_', require('./routes/_'));

app.get('/', (req, res) => {
    res.render('index', {
        pagetitle: 'Kitsune',
        header: {
            title: 'Kitsune',
            subtitle: 'A fully featured DiscordBot',
            button: [{link: '/commands', text: 'Commands'}, {link: '/chatlogs', text: 'Chatlogs'}]
        },
        cdnurl: config.cdn_url
    });
});

app.get('/invite', (req, res) => {
    res.redirect('https://discordapp.com/oauth2/authorize?access_type=online&client_id=168751105558183936&scope=bot&permissions=67464192')
});

app.get('/issues', (req, res) => {
    res.redirect('https://github.com/kitsunebot/bot/issues');
});

app.get('/repo', (req, res) => {
    res.redirect('https://github.com/kitsunebot/bot')
});

app.use((req, res, next) => {
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

app.listen(process.env.PORT || config.http_port || 8080);
