var oauth2rize = require('oauth2rize');
var config = require('./config');
var passport = require('passport');
var crypto = require('crypto');
var UserModel = require('../models/models').User;
var ClientModel = require('../models/models').Client;
var AccessTokenModel = require('../models/models').AccessToken;
var RefreshTokenModel = require('../models/models').RefreshToken;

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

        RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) {
                return done(err);
            }
        });
        AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) {
                return done(err);
            }
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');
        var token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
        var refreshToken = new RefreshTokenModel({token: refreshTokenValue, clientId: client.clientId, userId: user.userId});
        refreshToken.save(function (err) {
            if (err) {
                return done(err);
            }
        });
        var info = {scope: '*'}
        token.save(function (err, token) {
            if (err) {
                return done(err);
            }
            done(null, tokenValue, refreshTokenValue, {'expires_in': config.get('security.tokenLife')});
        });
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2rize.exchange.refreshToken(function (client, refreshToken, scope, done) {
    RefreshTokenModel.findOne({token: refreshToken}, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        UserModel.findById(token.userId, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
                if (err) {
                    return done(err);
                }
            });
            AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
                if (err) {
                    return done(err);
                }
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            var token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
            var refreshToken = new RefreshTokenModel({token: refreshTokenValue, clientId: client.clientId, userId: user.userId});
            refreshToken.save(function (err) {
                if (err) {
                    return done(err);
                }
            });
            var info = {scope: '*'}
            token.save(function (err, token) {
                if (err) {
                    return done(err);
                }
                done(null, tokenValue, refreshTokenValue, {'expires_in': config.get('security.tokenLife')});
            });
        });
    });
}));

// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
]




