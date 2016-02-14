// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS // 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require('dotenv').load();
var request = require('request'); 
var db = require('./models/index.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var favicon = require('favicon');

favicon("http://nodejs.org/", function(err, favicon_url){
  'http://www.favicon.co.uk/images/f.jpg';
});
//store IG access token 
var ig_access_token = process.env.ig_access_token;
var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 


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

app.use(cookieParser());

//set session options
// app.use(session ({
// 	saveUnitialized: true,
// 	resave: true, 
// 	secret: "SuperSecretCookie",
// 	store: new MongoStore({mongooseConnection: mongoose.connection}),
// 	ttl: 2 * 24 * 60 * 60,
// 	cookie: { maxAge: (60 * 60 * 1000)}
// }));


// show the signup form
app.get('/signup', function (req, res) {
  res.render('signup');
});

// create a user 
app.post('/users', function (req, res) {
  console.log(req.body);
  db.User.createSecure(req.body.email, req.body.password, function (err, newUser) {
    req.session.userId = newUser._id;
    res.redirect('/');
  });
});

// show the login form
app.get('/login', function (req, res) {
  res.render('login');
});

// authenticate the user and set the session
app.post('/sessions', function (req, res) {
  // call authenticate function to check if password user entered is correct
  db.User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err){
      console.log('authentication error: ', err);
      res.status(500).send();
    } else {
      console.log('setting sesstion user id ', loggedInUser._id);
      req.session.userId = loggedInUser._id;
      res.redirect('/');
    }
  });
});

// show user profile page
app.get('/profile', function (req, res) {
  console.log('session user id: ', req.session.userId);
  // find the user currently logged in
  db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
    if (err){
      console.log('database error: ', err);
      res.redirect('/login');
    } else {
      // render profile template with user's data
      console.log('loading profile of logged in user');
      res.render('user-show.ejs', {user: currentUser});
    }
  });
});

// api route to get all images (sanity check)
app.get("/api/images", function (req, res) {
	//get images from db
	db.Image.find(function(err, images) {
		res.render('/', {images: images});
	});
});



//api route to create new image
app.post("/api/images", function (req, res) {
	var newImage = req.body;
	console.log('received:',newImage);

	db.Image.create({lat: newImage.lat, lng: newImage.lng, url: newImage.url, name: newImage.name}, function (err, post) {
		if (err) {return console.log("create error:" + err);}
		console.log("created", post);
		// req.session.newImage = newImage;
		
		
		console.log("this post" + post);
		res.json(post);
		// res.cookie('imageId', image._id);

	});
});


// db.Image.remove({_id: imageId}, function (err, images) {
// 	console.log("images removed!");
// }

app.delete("/api/images/:_id", function (req, res) {
	// var image = req.body;
	// console.log("image", image);
	console.log(req.params._id);
	db.Image.find({
		_id: req.params._id
	}).remove(function(err, post) {
		console.log(post);
		console.log(removed);
	});
	// Get the ID
	// db.Image.Remove('._id', function(err, user) {
	// 	if (err) throw err;
	// console.log('Image deleted!');
	// });
	// db.Image.remove(function(err) {
	// 	if (err) throw err;

	// 	console.log('Image successfully deleted!');
	// });
	// wrong sytanx
	// db.Image.find(id imageID).remove()
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

	var savedImages = [];
	var savedNames = [];
	var savedLat = [];
	var savedLng = [];
	var savedId = [];
	db.Image.find({}, function(err, images) {
		for (var i=0; i<images.length; i++) {
			savedImages.push(images[i].url);
			savedNames.push(images[i].name);
			savedLat.push(images[i].lat);
			savedLng.push(images[i].lng);
			savedId.push(images[i]._id);
		}
		res.render('index', {images: savedImages,
							names: savedNames,
							lat: savedLat,
							lng: savedLng,
							imageIds: savedId
							});
	});

}); 





app.listen(process.env.PORT || 3000);

// app.listen(3000, function() {
// 	console.log("server running on port 3000");
// }); 