var Bundle = require('../../models/models').Bundle;
var log = require('../../libs/log')(module);

exports.get = function (req, res) {
    Bundle.find({}, function (err, bundles) {
        if (!err) return res.send(bundles);
        else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.post = function (req, res) {
    res.send('Not implemented.');
};

exports.getById = function (req, res) {
    return Bundle.findById(req.params.id, function (err, bundle) {
        if (!bundle) {
            res.statusCode = 500;
            return res.send({error: 'Not found'});
        }
        if (!err) {
            return res.send({status: 'OK', bundle: bundle});
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
