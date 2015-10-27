//CLIENT-SIDE JAVASCRIPT 
//On page load 

//Parallax 
// $(window).scroll(function() {

// 	var wScroll = $(this).scrollTop();
// 	$('#poloc').css({
// 		'transform' : 'translate(opx, '+wScroll /2 +'%)'
// 	});

// });


//globals

var instagram_location = ""; 
var info_row_target; 
var map; 
var lat; 
var lng;
var pos;

// var pos;

function initMap() {
	console.log("in initMap");
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
  	// initialize function executes once getCurrentPosition finishes running
  	navigator.geolocation.getCurrentPosition(initialize);
  }
}

function initialize(position) {
  	// this builds an object with latitude and longitude for setting the map's center
  	console.log("in initialize");
  	

  	var pos = {
  		lat: position.coords.latitude,
  		lng: position.coords.longitude
  	};
  	





console.log("pos is:", pos, " and position is: ", position);
  	// store pos coordinates in DB here
  	

  	setMapPosition(pos);

	// make instagram API call
	getPhotos(pos);
}

function setMapPosition(position) {
	console.log("in setMapPosition");
	console.log('postion is: ', position);


	map = new google.maps.Map(document.getElementById('map'), {
		center: position,
		zoom: 15,
		styles: [
		{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#444444"
			}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
			{
				"color": "#f2f2f2"
			}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
			{
				"saturation": -100
			},
			{
				"lightness": 45
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
			{
				"visibility": "simplified"
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
			{
				"saturation": "24"
			},
			{
				"visibility": "on"
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"hue": "#00ff45"
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text.stroke",
			"stylers": [
			{
				"visibility": "on"
			},
			{
				"saturation": "0"
			},
			{
				"hue": "#ff0000"
			},
			{
				"weight": "9.01"
			},
			{
				"invert_lightness": true
			}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.icon",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
			{
				"color": "#5ec3c0"
			},
			{
				"visibility": "on"
			}
			]
		}
		]

	});

var image = "static/images/glyphLogo.png";
var marker = new google.maps.Marker({
	position: position,
	map: map, 
	title: 'Current Location',
	icon: image,
});





var infoWindow = new google.maps.InfoWindow({map: map});

infoWindow.setPosition(position);
infoWindow.setContent('Current Location!');

$.get('/api/images/'+ position.lat +'/'+ position.lng, function(data) {
  		console.log(data);
  		for (var i = 0; i < data.length; i++) {
  			var igImages = data[i].images.thumbnail.url;
  			var igName = data[i].location.name;
  			$('#gallery').append("<div class='col-md-4' id='images'>" + "<img src='" + igImages + "'/>" + "<p>" + igName + "</p>"+ "</div>");
  			var imageLat = data[i].location.latitude;
  			var imageLng = data[i].location.longitude; 
  			var imageLocation = {lat: imageLat, lng: imageLng};
  			
  			console.log(imageLocation);
  			// build content string populated with image url and data
  			// make infowindow

  			var marker = new google.maps.Marker({
  				position: imageLocation,
  				map: map, 
  				title: 'Image locations',
  			});

  			// attach listener to marker to open info
  			console.log("current marker is: ", marker);
  		}


  	// 			 	<div class="col-sm-6 col-md-4">
  	// 	  			<div class="thumbnail">
  	// 	    				<img src="<%=images[i].images.standard_resolution.url%>">
  	// 	    		<div class="caption">
  	// 	      		<h3><%=images[i].location.name%></h3>
  	// 	    			</div>
  	// 	  		</div>
  	// 			</div>

  	// 			  		          <h4><%=images[i].location.latitude%></h4>
  	// 	          <h5><%=images[i].location.longitude%></h5>

  });



	// populate the locations of the user's other locations (iterate over collection and append to page);
}


function getPhotos(userLocation) {
	console.log("in get photos");

	

	//instagram photos json link 
	// var photo_locations = "";

	
	// API call to Instagram
	// return JSON of photos
	// $.ajax({
	// }).done(function(data) {
	//    // append images from Instagram to page
	// Once the AJAX call to our API (which will in turn hit Instagram's API) resolves, we build the map

	// })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}





$(document).ready(function() {
	info_row_target = $("#info");
	
	initMap();



	//createMap();
	// fetchInstaData(); 
	// Scrolling Button


}); 


