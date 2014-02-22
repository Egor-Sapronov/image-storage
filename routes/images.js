var Image = require('../models/mongo');
var path = require('path');
var fs = require('fs');
var join = path.join;

var photos = [];

exports.list = function (req, res) {
    res.render('images', {
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

        var ext = img.name.split('*').pop();

        var tempImage = new Image();
        tempImage.name = name;

        tempImage.save(function (err, image) {
            var path = join(dir, image.id + '.' + ext);

            fs.writeFile(path, img.buffer, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        })

        var path = join(dir, Image.id + '.' + ext);

        fs.rename(img.path, path, function (err) {
            if (err) return next(err);
        });
    };
};