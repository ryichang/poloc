// // DB 

var mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/coordinates' // plug in the db name you've been using
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("db is open for business");
});

module.exports.Location = require('./coordinate.js');