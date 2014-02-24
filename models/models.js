var mongoose = require('mongoose');
var log = require('../libs/log')(module);

mongoose.connect('mongodb://localhost/image_storage');

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback() {
    log.info("Connected to DB!");
});

var image = new mongoose.Schema({
    name: String,
    path: String
});

var bundle = new mongoose.Schema({
    name: String,
    imagesId: []
});

//module.exports = mongoose.model('image', image);

exports.Image = mongoose.model('image', image);
exports.Bundle = mongoose.model('bundle', bundle);