var mongoose = require('mongoose');

var coordinateSchema = mongoose.Schema({
	lat: String, 
	lng: String,
	createdAt: { type: Date, deafult: Date.now }
}); 

var location = mongoose.model('Coordinate', coordinateSchema); 

module.exports = Coordinate;