var log = require('../libs/log')(module);
var mongoose = require('mongoose');
var oauth2rize = require('oauth2orize');
var config = require('./config');
var passport = require('passport');
var crypto = require('crypto');
var UserModel = require('../models/models').User;
var ClientModel = require('../models/models').Client;
var AccessTokenModel = require('../models/models').AccessToken;

var server = oauth2rize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2rize.exchange.password(function (client, username, password, scope, done) {
    UserModel.findOne({username: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.checkPassword(password)) {
            return done(null, false);
        }

        AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) {
                return done(err);
            }
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
        var info = {scope: '*'}
        token.save(function (err, token) {
            if (err) {
                return done(err);
            }
            done(null, tokenValue);
        });
    });
}));

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
]

exports.register = function (req, res) {
    var user = new UserModel({username: req.body.username, password: req.body.password});
    user.save(function (err, user) {
        if (err) return log.error(err);
        else {

            log.info("New user - %s:%s", user.username, user.password);
            res.send({status: 'OK'});
        }
    });
};

exports.userInfo = function (req, res) {
    res.send({name: req.user.username});
};




