var mongoose = require('mongoose');
var log = require('../libs/log')(module);
var crypto = require('crypto');

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

var user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Image = mongoose.model('image', image);
exports.Bundle = mongoose.model('bundle', bundle);
exports.User = mongoose.model('user', user);