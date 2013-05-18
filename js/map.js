/*
 * Scripts for MapTest
 * 
 * Basically just want a Google Map of the USA with a certain state pointed out
 * 
 * Ben Harrison
 */

// Run this code on pageinit of the #map page
$(document).delegate("#map", "pageinit", function() {
	
	var map, // The Google Map
	zoomLevel, // The zoom level (larger sreens should be zoomed in more)
	screenWidth, // The width of the screen
	centerOfUSA = new google.maps.LatLng(35, -96), // The center Lat/Lon of the USA
	// Get the latitude and longitude of the state we want to point out
	// CURRENTLY PLACEHOLDER - POINTS AT MONTANA
	stateLatLon = new google.maps.LatLng(47.010226, -109.863281), // temp
	state; // The state we want to point out
	
	// Determine the window size to set zoom
	screenWidth = screen.width;
	if (screenWidth > 666) {
		zoomLevel = 4;
	} else {
		zoomLevel = 3;
	}
	
	// Set the options for the Google Map
	var mapOptions = {
		zoom: zoomLevel, // Zoom Level
		center: stateLatLon, // Center the map on the state
		disableDefaultUI: true, // Don't show pegman and map controls
		click: false, // Don't allow clicking on map
		mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP map type
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
	// Determine the screen size using JQuery
	screenWidth = screen.width;
	// If screen size is larger than 666px, set zoom to 4, otherwise set to 3
	if (screenWidth > 666) {
		map.setZoom(4);
	} else {
		map.setZoom(3);
	}
	
	
	
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
	$(window).resize(function() {
		screenWidth = screen.width;
		if (screenWidth > 666) {
			map.setZoom(4);
		} else {
			map.setZoom(3);
		}
		map.setCenter(centerOfUSA);
	});
	
	// Keep state within a certain rectangle, so user can't just pan around the whole world
	// Use LatLngBounds(Southwest Latlng, Northeast LatLng) to define the rectangle,
	// then check if state is within the rectangle on the 'move' event
	// Found solution here: http://stackoverflow.com/questions/4631382/google-maps-limit-panning
	var center;
	boundingRect = new google.maps.LatLngBounds( // The bounding rect
		new google.maps.LatLng(9.275622, -173.496094), // Southwest corner of bounding rect
		new google.maps.LatLng(55.178868, -51.328125)  // Northeast corner or bounding rect
	);
	google.maps.event.addListener(map, 'dragend', function() {
		if (boundingRect.contains(map.getCenter())) {
			return; // Center is inside bounding Rect, do nothin'
		}
		
		// We're out of bounds - Move the map back within the bounds
		//alert("outside bounding box");
		var center = map.getCenter(),
		    x = center.lng(),
			y = center.lat(),
			maxX = boundingRect.getNorthEast().lng(),
			maxY = boundingRect.getNorthEast().lat(),
			minX = boundingRect.getSouthWest().lng(),
			minY = boundingRect.getSouthWest().lat();
	
	    if (x < minX) x = minX;
	    if (x > maxX) x = maxX;
	    if (y < minY) y = minY;
	    if (y > maxY) y = maxY;
	
	    window.setTimeout(function() {
      		map.panTo(stateLatLon);  // Pan the map back to our state after 300 milliseconds
    	}, 300);
	}); // end dragend listener
}); // end #map pageinit function









