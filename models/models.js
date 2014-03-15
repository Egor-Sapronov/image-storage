var mongoose = require('mongoose');
var log = require('../libs/log')(module);
var crypto = require('crypto');
var config = require('../libs/config');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback() {
    log.info("Connected to DB!");
});

var image = new mongoose.Schema({
    name: String,
    path: String,
    userId: String
});

exports.Image = mongoose.model('image', image);

var bundle = new mongoose.Schema({
    name: String,
    imagesId: [],
    userId: String
});

exports.Bundle = mongoose.model('bundle', bundle);

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

user.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

user.virtual('userId')
    .get(function () {
        return this.id;
    });

user.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

user.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('user', user);

var client = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});

exports.Client = mongoose.model('client', client);

var accessToken = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.AccessToken = mongoose.model('accessToken', accessToken);
