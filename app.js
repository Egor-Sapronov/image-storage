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

imagesApi.setEndPoints(app);

bundlesApi.setEndPoints(app);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

http.createServer(app).listen(config.get('port'), function () {
    log.info('Express server listening on port' + ' ' + config.get('port'));
});

