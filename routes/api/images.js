var log = require('../../libs/log')(module);
var Image = require('../../models/models').Image;

exports.get = function (req, res) {
    Image.find({}, function (err, images) {
        if (!err) {
            return res.send(images);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
}

exports.post = function (req, res) {
    res.send('Not implemented.');
};

exports.getById = function (req, res) {
    return Image.findById(req.params.id, function (err, image) {
        if (!image) {
            res.statusCode = 500;
            return res.send({error: 'Not found'});
        }
        if (!err) {
            return res.send({status: 'OK', image: image});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
}

exports.put = function (req, res) {
    res.send('Not implemented.');
};

exports.delete = function (req, res) {
    res.send('Not implemented.');
};