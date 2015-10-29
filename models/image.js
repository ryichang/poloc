var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema ({
  lat: String,
  lng: String,
  url: String,
});

var Image = mongoose.model('Image', ImageSchema); 

module.exports = Image;