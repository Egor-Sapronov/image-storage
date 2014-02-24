var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/image_storage');

var image = new mongoose.Schema({
    name: String,
    path: String
});

var bundle = new mongoose.Schema({
    name: String,
    imagesId: []
});

//module.exports = mongoose.model('image', image);

exports.Image = mongoose.model('image', image);
exports.Bundle = mongoose.model('bundle', bundle);