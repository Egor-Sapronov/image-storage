var Image = require('../models/mongo');
var path = require('path');
var fs = require('fs');
var join = path.join;

var images = [];

exports.list = function (req, res, next) {
    Image.find({}, function (err, images) {
        if (err) return next(err);
        res.render('images', {
            title: 'Images',
            images: images
        });
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

        var ext = img.name.split('.').pop();

        var tempImage = new Image();
        tempImage.name = name;

        tempImage.save(function (err, image) {
            var path = join(dir, image.id + '.' + ext);

            image.path = image.id + '.' + ext;
            image.save();

            fs.rename(img.path, path, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    };
};