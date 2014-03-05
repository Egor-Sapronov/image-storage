var config = require('./config');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var UserModel = require('../models/models').User;
var ClientModel = require('../models/models').Client;
var AccessTokenModel = require('../models/models').AccessToken;
var RefreshTokenModel = require('../models/models').RefreshToken;

passport.use(new BasicStrategy(
    function (username, password, done) {
        ClientModel.findOne({clientID: username}, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret != password) {
                return done(null, false);
            }

            return done(null, client);
        });
    }
));