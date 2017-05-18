$(document).ready(function() {
	initialize();
});


function initialize() {
	var width = 20;
	var height = 20;
	
	var playground = {};
	
	// Initialise playground
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			playground[getToken(x, y)] = 0;
		}
	}
}

function getToken(x, y) {
	return x + ':' + y;
}