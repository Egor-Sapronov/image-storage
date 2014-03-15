var log = require('../../libs/log')(module);
var Image = require('../../models/models').Image;
var path = require('path');
var fs = require('fs');
var join = path.join;
var passport = require('passport');
var UserModel = require('../../models/models').User;
var ClientModel = require('../../models/models').Client;
var AccessTokenModel = require('../../models/models').AccessToken;
var RefreshTokenModel = require('../../models/models').RefreshToken;

exports.get = function (req, res) {
    res.send('Not implemented');
};

exports.post = function (req, res) {
    res.send('Not implemented');
};

exports.getById = function (req, res) {
    res.send('Not implemented');
};

exports.put = function (req, res) {
    res.send('Not implemented');
};

exports.delete = function (req, res) {
    res.send('Not implemented');
};