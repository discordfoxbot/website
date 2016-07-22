process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var storyboard = require('storyboard');
var S = require('string');

var story = storyboard.mainStory;
storyboard.addListener(require('storyboard/lib/listeners/console').default);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('short',{
    stream: {
        write: (toLog) => {
            story.info('http',S(toLog).chompRight('\n').s)
        }
    }
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/characters', require('./routes/characters'));

app.get('/', (req,res)=>{res.redirect('https://discordapp.com/oauth2/authorize?access_type=online&client_id=168751105558183936&scope=bot&permissions=473031686')});
app.get('/*', (req, res)=>{res.render('index')});

app.use(function (req, res) {
    res.redirect('/');
});

app.listen(4236);
