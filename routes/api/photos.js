var Photo = require('../../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.get = function (req, res) { // api/photos
    return Photo.find(function(err, photos){
       if(!err){
           return res.send(photos);
       } else {
           res.statusCode=500;
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
                res.statusCode = 200;
                res.send({photo: photo});

                var ext = photo.name.split('*').pop(); // Get file extension.
                var fileName = photo.id + '.' + ext;
                var path = join(dir, fileName);

                fs.rename(photo.name, path, function (err) {
                    if (err) {
                        res.statusCode = 500;
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

