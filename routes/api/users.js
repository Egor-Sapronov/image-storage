var log = require('../../libs/log')(module);
var Image = require('../../models/models').Image;
var path = require('path');
var fs = require('fs');
var join = path.join;
var passport = require('passport');
var UserModel = require('../../models/models').User;

exports.get = function (req, res) {
    res.send('Not implemented');
};

exports.post = function (req, res) {
    var user = new UserModel({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err, user) {
        if (!err) {
            log.info("New user - %s:%s", user.username, user.password);
            res.send({status: 'OK', userName: user.username});
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                return res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
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

exports.setEndPoints = function (app) {
    app.get('/api/users', exports.get);
    app.get('/api/users', exports.getById);
    app.post('/api/users', exports.post);
    app.put('/api/users', exports.put);
    app.delete('/api/users', exports.delete);
}
