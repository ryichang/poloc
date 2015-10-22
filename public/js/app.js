//CLIENT-SIDE JAVASCRIPT 
//On page load 

//globals
var instagram_location = ""; 
var info_row_target; 
var map; 

$(document).ready(function() {
	info_row_target = $("#info");

	createMap();
	fetchInstaData(); 

}); 

function fetchInstagramData(){
  $.get(instagram_location, function(response){
    response.features.forEach(function renderRowAndMarker(quake){
      // ADD INFO ROW

      // var title = instagram.properties.title;
      // var hours_ago = Math.round( ( Date.now() - instagram.properties.time ) / (1000*60*60) );
      info_row_target.append( "<p>" + title + " / " + hours_ago + " hours ago</p>");

      // CREATE MARKER
      // var lat = instagram.geometry.coordinates[1];
      // var lng = instagram.geometry.coordinates[0];
      new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map,
        title: title,
        icon: 'pictureeeeeeeeeeeee.png'
      });
    });
  });
}

function createMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.78, lng: -122.44},
    zoom: 2
  });
}
