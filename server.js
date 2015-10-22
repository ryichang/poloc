// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS // 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//set the view engine to ejs
app.set("view engine", "ejs");
//serve js & css files 
app.use("/static", express.static("public"));
//body parser confic to accept our datatypes 
app.use(bodyParser.urlencoded({
	extended: true
})); 

app.get('/', function (req,res) {
	res.render('index');
}); 








app.listen(3000, function() {
	console.log("server running on port 3000");
}); 