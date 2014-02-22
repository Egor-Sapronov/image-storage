var Image = require('../models/mongo');
var path = require('path');
var fs = require('fs');
var join = path.join;

var photos = [];

exports.list = function (req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
};

exports.form = function (req, res) {
    res.render('images/upload', {
        title: 'Image upload'
    });
};

exports.submit = function (dir) {
    return function (req, res, next) {
        var img = req.files.image.file;
        var name = req.body.image.name || img.name;
        var path = join(dir, img.name);

        fs.rename(img.path, path, function (err) {
            if (err) return next(err);

            Image.create({
                name: name,
                path: img.name
            }, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    };
};