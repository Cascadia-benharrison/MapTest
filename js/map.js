/*
 * Scripts for MapTest
 * 
 * Basically just want a Google Map of the USA with a certain state pointed out
 * 
 * Ben Harrison
 */

var map, // The Google Map
	zoomLevel, // The zoom level (larger sreens should be zoomed in more)
	screenWidth, // The width of the screen
	state; // The state we want to point out

function initialize() {
	
	// Get the latitude and longitude of the state we want to point out
	// CURRENTLY PLACEHOLDER - POINTS AT MONTANA
	var stateLatLon = new google.maps.LatLng(47.010226, -109.863281); // temp
	
	// Determine the screen size using JQuery
	screenWidth = $(window).width();
	// If screen size is larger than 666px, set zoom to 4, otherwise set to 3
	if (screenWidth > 666) {
		zoomLevel = 4;
	} else {
		zoomLevel = 3;
	}
	
	// Set the options for the Google Map
	var mapOptions = {
    	zoom: zoomLevel, // Zoom Level
    	center: new google.maps.LatLng(35, -96), // Center the map middle of USA
    	disableDefaultUI: true, // Don't show pegman and map controls
    	mapTypeId: google.maps.MapTypeId.TERRAIN // Terrain map type
	};
	
	// The styles array for the map (only show the outlines of the states, no labels)
	// Generated using Google's Styled Map Wizard:
	// http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	var stylesArray = [
	  {
	    "featureType": "administrative.province",
	    "elementType": "geometry",
	    "stylers": [
	      { "weight": 1.3 },
	      { "color": "#686766" }
	    ]
	  },{
	  },{
	    "featureType": "administrative.country",
	    "elementType": "geometry",
	    "stylers": [
	      { "color": "#161316" },
	      { "weight": 0.9 }
	    ]
	  },{
	    "featureType": "administrative.country",
	    "elementType": "labels.text",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "water",
	    "elementType": "labels.text",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "administrative.locality",
	    "elementType": "labels",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "administrative.province",
	    "elementType": "labels.text",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  }
	];
	
	// Create the new Google Map with the above mapOptions
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	// Set the options set in the stylesArray
	map.setOptions({styles: stylesArray});
	
	// Display an InfoBox containing the state artwork that points to the state
	var infoWindow = new google.maps.InfoWindow({
    	content: '<img id="artwork" src="state_artwork_placeholder.png">',
    	map: map,
    	position: stateLatLon,
  	});
	
	// Keep the map centered when switching between portrait/landscape mode
	// If window size is larger than 666px, set zoom to 4, otherwise set zoom to 3
	var center;
	function calculateCenter() {
		center = map.getCenter();
	}
	google.maps.event.addDomListener(map, 'idle', function() {
		calculateCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
		screenWidth = $(window).width();
		if (screenWidth > 666) {
			map.setZoom(4);
		} else {
			map.setZoom(3);
		}
	});
}

// Add an event listener to the window object that will call the initialize function
// once the page has loaded
google.maps.event.addDomListener(window, 'load', initialize);