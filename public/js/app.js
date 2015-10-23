//CLIENT-SIDE JAVASCRIPT 
//On page load 

//globals
var instagram_location = ""; 
var info_row_target; 
var map; 
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
  	
	// make instagram API call
  	getPhotos(pos);
}

function setMapPosition(position) {
	console.log("in setMapPosition");
	console.log('postion is: ', position);
	var map = new google.maps.Map(document.getElementById('map'), {
		center: position,
		zoom: 14,
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
	var infoWindow = new google.maps.InfoWindow({map: map});

	infoWindow.setPosition(position);
	infoWindow.setContent('Location found.');
	// map.setCenter(pos);
	

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
	// createMap();
	// fetchInstaData(); 

}); 

// function fetchInstagramData(){
//   $.get(instagram_location, function(response){
//     response.features.forEach(function renderRowAndMarker(quake){
//       // ADD INFO ROW

//       // var title = instagram.properties.title;
//       // var hours_ago = Math.round( ( Date.now() - instagram.properties.time ) / (1000*60*60) );
//       info_row_target.append( "<p>" + title + " / " + hours_ago + " hours ago</p>");

//       // CREATE MARKER
//       // var lat = instagram.geometry.coordinates[1];
//       // var lng = instagram.geometry.coordinates[0];
//       new google.maps.Marker({
//         position: new google.maps.LatLng(lat,lng),
//         map: map,
//         title: title,
//         icon: 'pictureeeeeeeeeeeee.png'
//       });
//     });
//   });
// }

// function createMap(){
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 37.78, lng: -122.44},
//     zoom: 2
//   });
// }
