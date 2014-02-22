var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/image_storage');

var image = new mongoose.Schema({
    name:String,
    path:String
});

module.exports=mongoose.model('image',image);