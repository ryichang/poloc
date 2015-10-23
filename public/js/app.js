//CLIENT-SIDE JAVASCRIPT 
//On page load 

//globals
var instagram_location = ""; 
var info_row_target; 
var map; 
var pos;

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 6
	});
	var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  		pos = {
  			lat: position.coords.latitude,
  			lng: position.coords.longitude
  		};
  		console.log("pos is:", pos, " and position is: ", position);
  		// store pos coordinates in DB here

  		infoWindow.setPosition(pos);
  		infoWindow.setContent('Location found.');
  		map.setCenter(pos);
  	});
  }
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
	setTimeout(function() { console.log(pos); }, 7000);
	
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
