var log = require('../../libs/log')(module);
var Image = require('../../models/models').Image;
var path = require('path');
var fs = require('fs');
var join = path.join;
var passport = require('passport');

get = function (req, res) {
    return Image.find({}, function (err, images) {
        if (!err) return res.send(images);
        else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
}

post = function (dir) {
    return function (req, res, next) {
        log.info(JSON.stringify(req.files))
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
                    return res.send({status: 'OK', image: image});
                });
            });
        });
    };
};

getById = function (req, res) {
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

put = function (req, res) {
    res.send('Not implemented.');
};

remove = function (req, res) {
    res.send('Not implemented.');
};

exports.setEndPoints = function (app) {
    app.get('/api/images', passport.authenticate('bearer', { session: false }), get);
    app.get('/api/images/:id', passport.authenticate('bearer', { session: false }), getById);
    app.post('/api/images', passport.authenticate('bearer', { session: false }), post(app.get('images')));
    app.put('/api/images/:id', passport.authenticate('bearer', { session: false }), put);
    app.delete('/api/images/:id', passport.authenticate('bearer', { session: false }), remove);
};
