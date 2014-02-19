var mongoose = require('mongoose');
var log = require('../libs/log')(module);

mongoose.connect('mongodb://localhost/image_storage');
var db = mongoose.connection;

db.on('error', function(err){
   log.error('connection error:', err.message);
});

db.once('open', function callback(){
   log.info('Connected to DB!');
});

var schema = mongoose.Schema({
    name: String,
    path: String
});

module.exports=mongoose.model('Photo', schema);