/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
//var routes=require('./routes');
var images = require('./routes/images');
var path = require('path');
var log = require('./libs/log')(module);
var imagesApi=require('./routes/api/images');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('images', __dirname + '/public/images');
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

app.get('/api/images', imagesApi.get);
app.get('/api/images/:id', imagesApi.getId);

app.get('/', images.list);

app.get('/upload', images.form);
app.post('/upload', images.submit(app.get('images')));

http.createServer(app).listen(app.get('port'), function () {
    log.info('Express server listening on port'+' '+app.get('port'));
});
