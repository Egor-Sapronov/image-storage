var Photo = require('../../models/Photo');
var path = require('path');
var fs = require('fs');
var log=require('../../libs/log')(module);
var join = path.join;

exports.get = function (req, res) { // api/photos
    return Photo.find(function(err, photos){
       if(!err){
           return res.send(photos);
       } else {
           res.statusCode=500;
           log.error('Internal error(%d): %s', res.statusCode, err.message);
           return res.send({error:'Server error'});
       }
    });
};

exports.post = function (dir) {
    return function (req, res) { // api/photos
        var photo = new Photo({
            name: req.body.name
        });

        photo.save(function (err) {
            if (!err) {
                log.info('photo creates')
                res.statusCode = 200;
                res.send({photo: photo});

                var img = req.body.image;

                var ext = photo.name.split('*').pop(); // Get file extension.
                var fileName = photo.id + '.' + ext;
                var path = join(dir, fileName);

                fs.rename(img.path, path, function (err) {
                    if (err) {
                        res.statusCode = 500;
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                        res.send({error: 'Server error'});
                    }
                });
            } else {
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    };
};

exports.getById = function (req, res) { // api/photos:id
    res.send('This is not implemented now');
};

exports.put = function (req, res) { // api/photos:id
    res.send('This is not implemented now');
};

exports.delete = function (req, res) { // api/photos:id
    res.send('This is not implemented now');
};

