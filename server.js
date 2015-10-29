// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS // 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require('dotenv').load();
var request = require('request'); 

//Fav icon 
var favicon = require('serve-favicon');
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

// api route to get all images (sanity check)
app.get("api/images", function (req, res) {
	//get images from db
	db.Image.find(function(err, images) {
		res.send(images);
	});
});

//api route to create new image
app.post("/api/images", function (req, res) {
	var newImage = req.body;
	console.loog(newImage);

	db.Image.create({lat: newImage.lat, lng: newImage.lng, url: newImage.url}, function (err, post) {
		if (err) {return console.log("create error:" + err);}
		console.log("created", image);
		res.json(image);
	});
});



//api route to get all images (sanity check)
// app.get("/api/images/:lat/:lng", function (req, res) {
// 	db.Image.find(function(err, posts) {
// 		res.send(images);
// 	});
// });




//Lat & Lng from Google Maps position, inserting position to Instagram API search
app.get("/api/images/:lat/:lng", function (req, res) {
	console.log(ig_access_token);
	request('https://api.instagram.com/v1/media/search?lat='+ req.params.lat + '&lng=' + req.params.lng + '&distance=1000&access_token='+ig_access_token, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	   
	    images = JSON.parse(body).data;
	    res.send(images);
		

	    //store images in database 
	    
	  }
	});
});


app.get('/', function (req,res) {
	var locations = [];
	res.render('index', {locations: locations});
}); 





app.listen(process.env.PORT || 3000);

// app.listen(3000, function() {
// 	console.log("server running on port 3000");
// }); 