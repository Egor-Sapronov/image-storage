var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/image_storage');

var schema = mongoose.Schema({
    name: String,
    path: String
});

module.exports=mongoose.model('Photo', schema);