/*
 * test.js
 * 
 * This js file is just for testing out the map functionality. Since we don't
 * have the QR codes to scan, this file creates a mock scan functionality.
 * Instead of actually scanning to get to the state page (div#second) this code
 * just populates a list of buttons for all the states, which you tap to get to
 * the state page, then you should be able to tap the map button to show that
 * state on the google map with the artwork in an InfoWindow.
 */

// Run the loadTestHomePage function upon pageinit of the #test_home page
$(document).delegate("#test_home", "pageinit", function() {
	var page = $(this);
	
	// Get all the states from the restful server
	$.ajax({
		type: 'GET',
		url: 'http://216.186.69.45/state_list/',
		dataType: 'json',
		success: addAllStateButtons
	});
	
	// Function that adds a button for each state to get to its State Screen
	function addAllStateButtons(data) {
		var allStates = $.each(data.states, function(index, state) {
			$('#test_home > div[data-role="content"] > ul').append('<li><a href="#second" data-role="button" data-icon="arrow-r" data-iconpos="right">' + state.name + '</a></li>');
		});
		
		// User clicks state button, add the state's name to the <h1> in the #second page
		$('#test_home > div[data-role="content"] > ul li a').click(function() {
			var stateName = $(this).text();
			$('#second > div[data-role="content"] > h1').text(stateName);
		});
		// Need these 2 lines for JQuery Mobile styles on the state links
		page.trigger('pagecreate');
		$("ul").listview('refresh');
	}
	
});

// Code to run for the #second page
$(document).delegate('#second', 'pageinit', function() {
	$('a[href="#map"]').click(function() {
		$('#map > div[data-role="content"] > h3').text($('#second > div[data-role="content"] > h1').text());
	});
});
