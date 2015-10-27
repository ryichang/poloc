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
var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 
console.log(ig_access_token);
console.log(GOOGLE_API_KEY);

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

// var currentLocation; 
// request('https://maps.googleapis.com/maps/api/js?key='+GOOGLE_API_KEY+'&signed_in=true&callback=initMap', function (error, response, body) {
// 	if (!error && response.statusCode ==200) {
// 	console.log(currentLocation);
// 	}
// });

	// app.get('/coordinates', function (req, res) {
 //  		var pos = [
 //  			{lat: position.coords.latitude},
 //  			{lng: position.coords.longitude}
 //  		];
 //  		res.json(coordinates);
 //  	});
 //  	console.log(pos);





app.get("/api/images/:lat/:lng", function (req, res) {
	console.log(ig_access_token);
	request('https://api.instagram.com/v1/media/search?lat='+ req.params.lat + '&lng=' + req.params.lng + '&distance=1000&access_token='+ig_access_token, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // This API sends the data as a string so we need to parse it. This is not typical.
	    images = JSON.parse(body).data;
	    res.send(images);
	  }
	});
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
// server.js


app.listen(process.env.PORT || 3000);

// app.listen(3000, function() {
// 	console.log("server running on port 3000");
// }); 