var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/image_storage');

var bundle = new mongoose.Schema({
    name: String,
    imagesId: []
});

module.exports = mongoose.model('bundle', bundle);