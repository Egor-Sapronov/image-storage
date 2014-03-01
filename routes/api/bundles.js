var Bundle = require('../../models/models').Bundle;
var Image = require('../../models/models').Image;
var log = require('../../libs/log')(module);

exports.get = function (req, res) {
    return Bundle.find({}, function (err, bundles) {
        if (!err) return res.send(bundles);
        else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.post = function (req, res) {
    var bundle = new Bundle({
        name: req.body.name,
        imagesId: req.body.imagesId
    });

    bundle.save(function (err) {
        if (!err) {
            log.info('bundle created');
            return res.send({status: 'OK', bundle: bundle});
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
};

var getImages = function (bundle) {
    var images = []
    bundle.imagesId.forEach(function (value) {
        Image.findById(value, function (err, image) {
            if (!err) {
                images.push(image);
            }
        });
    });
    return images;
};

exports.getById = function (req, res) {
    var self = this;

    return Bundle.findById(req.params.id, function (err, bundle) {
        if (!bundle) {
            res.statusCode = 500;
            return res.send({error: 'Not found'});
        }
        if (!err) {
            self.images = [];
            self.fullBundle = {
                name: bundle.name,
                images: getImages(bundle)
            };

            return res.send({status: 'OK', bundle: self.fullBundle});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.put = function (req, res) {
    res.send('Not implemented.');
};

exports.delete = function (req, res) {
    res.send('Not implemented.');
};
