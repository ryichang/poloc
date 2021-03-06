//CLIENT-SIDE JAVASCRIPT 
//On page load 
var markers = [];
//AFFIX NAVBAR TO TOP 
jQuery(document).ready(function($) {
    $('#navbar-search').affix({
        offset: {
            top: 100
        }
    });
});




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

//Generate New Map, set zoom to 15 to optimize 1000km search parameters, set style 
	map = new google.maps.Map(document.getElementById('map'), {
		center: position,
		zoom: 14,
		styles: [
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#737373"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "97"
            },
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            },
            {
                "lightness": "81"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "100"
            },
            {
                "gamma": "10.00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "100"
            },
            {
                "gamma": "10.00"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "100"
            },
            {
                "gamma": "10.00"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#565656"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-70"
            },
            {
                "lightness": "43"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#39d2ca"
            }
        ]
    }
]

	});


// Insert marker for Current User's Geolocation 
var marker = new google.maps.Marker({
	position: position,
	map: map, 
	title: 'Current Location',
	
});


   

var infoWindow = new google.maps.InfoWindow({map: map});

infoWindow.setPosition(position);
infoWindow.setContent('EXPLORE');

$.get('/api/images/'+ position.lat +'/'+ position.lng, function(data) {
  		console.log(data);
  		for (var i = 0; i < data.length; i++) {
  			var igImages = data[i].images.low_resolution.url;
  			var igName = data[i].location.name;
  			var imageLat = data[i].location.latitude;
  			var imageLng = data[i].location.longitude; 
        $('#gallery').append("<div class='col-md-6 text-center image-block' data-lat='" + imageLat + "' data-lng='" + imageLng +  " '>" + "<img class='img-responsive' src='" + igImages + "'/>" + "<p>" + igName + "</p>" + "</div>");
  			var imageLocation = {lat: imageLat, lng: imageLng};

  		
  			
  			console.log(imageLocation);
  			// build content string populated with image url and data
  			// make infowindow
  			var image = "static/images/igMarker.png";
  			var marker = new google.maps.Marker({
  				position: imageLocation,
  				map: map, 
  				title: 'Image locations',
  				icon: image,
  			});

        markers.push(marker);
  

  			// attach listener to marker to open info
  			//console.log("current marker is: ", marker);
  		}


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


// $('#gallery').on('click', '.image-block', function(e) { e.preventDefault(); console.log(this); })



$(document).ready(function() {
  info_row_target = $("#info");
  
  initMap();

  $("#saved").on('click', '.image-block', function(e){
      e.preventDefault();
      var imageId = $(this).attr('id');
      var deleteImage = $(this).closest('div');
        console.log(imageId);
      // var imageblock = $(this);
      // var id = $(imageblock).data("imageIds");
      $.ajax ({
        url: '/api/images/'  + imageId, 
        type: 'DELETE',
      })
      .done(function (data) {
        console.log(data);
        $(deleteImage).remove();
        console.log("this image has been removed");
      })
      .fail(function(data) {
      console.log("this image could not be deleted");
      });
    
      

      // imageblock.remove();

      // $.remove("/api/images", id, function(response) {

      // });
  
  });

    });


  $('#gallery').on('click', '.image-block', function(e) {
    e.preventDefault();
    console.log(this);

    var imageblock = $(this);
    var lat = $(imageblock).data("lat");
    var lng = $(imageblock).data("lng");
    var url = $(imageblock).children().first().attr("src");
    var name = $(this, 'p').text();
    console.log(lng);
    console.log(lat);
    console.log(url);
    console.log(name);
    var img = {
                lat: lat,
                lng: lng,
                url: url,
                name: name,
    };
    var formData = img;
    console.log("formData is" + JSON.stringify(formData));

    $('#saved').prepend("<div class='col-md-6 text-center image-block' data-lat='" + lat + "' data-lng='" + lng +  " '>" + "<img class='img-responsive' src='" + url + "'/>" + "<p>" + name + "</p>" +"</div>");

      console.log("here");
     $.post("/api/images", img, function(response) {


      
      console.log('response:', response);
    })
     .done(function(post) {
      console.log("success");
     });

    $('#saved').on('click', ".image-block", function(e) {
      e.preventDefault();
      console.log(this);
    });


   


  // for (var i = 0; i < data.length; i++) {
  //       var igImages = data[i].images.low_resolution.url;
  //       var igName = data[i].location.name;
  //       var imageLat = data[i].location.latitude;
  //       var imageLng = data[i].location.longitude; 
  //       $('#gallery').append("<div class='col-md-6 text-center image-block' data-lat='" + imageLat + "' data-lng='" + imageLng +  " '>" + "<img class='img-responsive' src='" + igImages + "'/>" + "<p>" + igName + "</p>" + "</div>");
  //       var imageLocation = {lat: imageLat, lng: imageLng};

      
        
  //       console.log(imageLocation);
  //       // build content string populated with image url and data
  //       // make infowindow
  //       var image = "static/images/igMarker.png";
  //       var marker = new google.maps.Marker({
  //         position: imageLocation,
  //         map: map, 
  //         title: 'Image locations',
  //         icon: image,
  //       });


   

    // }

    // get lat, lng, and url using jQUery
    // AJAX call posting image to server
    // .done callback, append image to page

    // <div class="col-md-3 text-center image-block" data-lat="37.7842827" data-lng="-122.4043045 "><
    // div class="img">
    // <img class="img-responsive" src="https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s150x150/e35/12070930_1193923637291476_2001211595_n.jpg">
    // <div class="overlay"><a href="#" class="expand">+</a><a class="close-overlay hidden">x</a></div></div><p>Mel's Diner</p></div>
 

}); 


