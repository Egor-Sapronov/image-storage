/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var images = require('./routes/images');
var path = require('path');
var log = require('./libs/log')(module);
var imagesApi = require('./routes/api/images');
var bundlesApi = require('./routes/api/bundles');
var usersApi = require('./routes/api/users');
var passport = require('passport');
var oauth2 = require('./libs/oauth2');
var config = require('./libs/config');
require('./libs/oauth');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('images', __dirname + '/public/images');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.post('/oauth/token', oauth2.token);
app.post('/oauth/register', oauth2.register);
app.get('/oauth/user', passport.authenticate('bearer', { session: false }), oauth2.userInfo);

// GET: /api/images
// GET: /api/images/:id
// POST: /api/images
// UPDATE: /api/images/:id
// DELETE: /api/images/:id
imagesApi.setEndPoints(app);

// GET: /api/bundles
// GET: /api/bundles/:id
// POST: /api/bundles
// UPDATE: /api/bundles/:id
// DELETE: /api/bundles/:id
bundlesApi.setEndPoints(app);

// GET: /api/users
// GET: /api/users/:id
// POST: /api/users
// UPDATE: /api/users/:id
// DELETE: /api/users/:id
usersApi.setEndPoints(app);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

http.createServer(app).listen(config.get('port'), function () {
    log.info('Express server listening on port' + ' ' + config.get('port'));
});

