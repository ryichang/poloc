var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageSchema = new Schema ({
  lat: String,
  lng: String,
  url: String,
  name: String,
});

var Image = mongoose.model('Image', ImageSchema); 

module.exports = Image;