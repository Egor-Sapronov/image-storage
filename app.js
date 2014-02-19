/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var photos = require('./routes/photos');
var photosApi = require('./routes/api/photos');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var log = require('./libs/log')(module);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', __dirname + '/public/photos');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', photos.list);
app.get('/users', user.list);

app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));

app.get('/api/photos', photosApi.get);
app.post('/api/photos', photosApi.post(app.get('photos')));
app.get('/api/photos/:id', photosApi.getById);
app.put('/api/photos/:id', photosApi.put);
app.delete('/api/photos/:id', photosApi.delete);

http.createServer(app).listen(app.get('port'), function () {
    log.info('Express server listening on port'+' '+app.get('port'));
});
