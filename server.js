// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS // 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require('dotenv').load();
var request = require('request'); 
//store IG access token 
var ig_access_token = process.env.ig_access_token;
console.log(ig_access_token);

var ig = require('instagram-node').instagram();
instagram = require('instagram-node-lib');
instagram.set('client_id', process.env.ig_client_id);
instagram.set('client_secret', process.env.ig_client_secret); 

// var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 

//set the view engine to ejs
app.set("view engine", "ejs");
//serve js & css files 
app.use("/static", express.static("public"));
//body parser confic to accept our datatypes 
app.use(bodyParser.urlencoded({
	extended: true
})); 

var igNearby; 

console.log(ig_access_token);
request('https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token='+ig_access_token, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // This API sends the data as a string so we need to parse it. This is not typical.
    images = JSON.parse(body).data;
  }
});



app.get('/', function (req,res) {
	var locations = [];
	res.render('index', {locations: locations});
}); 


// app.get('/', function (req,res) {
// 	request('https://www.googleapis.com/geolocation/v1/geolocate?key=', function (error, response, body){
// 		if (!error && response.statusCode == 200) {
// 			var pictures = JSON.parse(body).pictures;

// 			res.render('index', {pictures: pictures});
// 		}
// 	}); 
// }); 
// var db = require('./models/index.js');

// app.get('/coordinates', function(req, res) {
// 	db.Coordinate.find({}, function(err, coordinates) {
// 		if (err) console.log(err);
// 		res.render('index', {
// 			coordinates: coordinates
// 		});

// 	});
// });

// app.post('/coordinates', function(req, res) {
// 	console.log(req.body);
// 	db.Coordinate.create(req.body, function(err, coordinate) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.json(coordinate);
// 	});
// });





app.listen(3000, function() {
	console.log("server running on port 3000");
}); 