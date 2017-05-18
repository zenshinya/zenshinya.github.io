$(document).ready(function() {
	initialize();
});

var colorScheme = {
	0: 'black',
	1: 'red',
	2: 'green',
	3: 'blue'
};

function initialize() {
	var width = 20;
	var height = 20;
	
	var playground = {};
	
	// Initialise playground
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			playground[getToken(x, y)] = 0;
			drawUI(x, y, 0);
		}
	}
	
	// Create sample
	createSample(playground);
}

function createSample(playground) {
	for (var y = 5; y < 15; y++) {
		for (var x = 8; x < 12; x++) {
			playground[getToken(x, y)] = 1;
			drawUI(x, y, 1);
		}
	}
}

function drawUI(x, y, color) {
	var tileWidth = 30;
	var tileHeight = 30;
	
	// If tile already exist, remove tile
	if ($(`#${getToken(x, y)}`).length) {
		$(`#${getToken(x, y)}`).remove();
	}
	
	getPlaygroundDom().append(
		`<div id="${getToken(x, y)}" class="tile" style="background-color:${colorScheme[color]}; left:${x * tileWidth}px; top:${y * tileHeight}px; width:${tileWidth}px; height:${tileHeight}px;"></div>`
	);
}

function getPlaygroundDom() {
	return $('#playground');
}

function getToken(x, y) {
	return `tile-${x}-${y}`;
}