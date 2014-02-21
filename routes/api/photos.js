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
            name: req.body.image.name
        });

        photo.save();

        res.send(photo.name);
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

