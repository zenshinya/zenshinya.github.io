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
	
	var tileWidth = 30;
	var tileHeight = 30;
	
	var playground = {};
	
	// Initialise playground
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			playground[getToken(x, y)] = 0;
			getPlaygroundDom().append(
				`<div id=${getToken(x, y)}" class="tile" style="background-color:${colorScheme[0]}; left:${x * tileWidth}px; top:${y * tileHeight}px; width:${tileWidth}px; height:${tileHeight}px;"></div>`
			);
		}
	}
	
	// Create sample
	createSample(playground);
}

function createSample(playground) {
}

function drawUI(playground) {
}

function getPlaygroundDom() {
	return $('#playground');
}

function getToken(x, y) {
	return x + ':' + y;
}