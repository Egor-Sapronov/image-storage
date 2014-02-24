var Image   = require('../models/models').Image;
var path    = require('path');
var fs      = require('fs');
var join    = path.join;


exports.list = function (req, res, next) {
    var images = [];
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

        var image = new Image();
        image.save(function (err, image) {
            var fileName = image.id + '.' + ext;
            var path = join(dir, fileName);

            image.name = name;
            image.path = fileName;
            image.save(function (err) {
                if (err) return next(err);
                fs.rename(img.path, path, function (err) {
                    if (err) return next(err);
                    res.redirect('/');
                });
            });
        });
    };
};