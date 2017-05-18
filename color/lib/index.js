$(document).ready(function() {
	initialize();
});

var colorScheme = {
	0: 'black',
	1: 'red',
	2: 'green',
	3: 'blue'
};

var currentSelectedColorIdx = 0;

var playground = {};

function initialize() {
	var width = 20;
	var height = 20;
	
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
	// Create first red box
	for (var y = 2; y < 18; y++) {
		for (var x = 8; x < 12; x++) {
			playground[getToken(x, y)] = 1;
			drawUI(x, y, 1);
		}
	}
	
	// Create second green box
	for (var y = 4; y < 6; y++) {
		for (var x = 1; x < 15; x++) {
			playground[getToken(x, y)] = 2;
			drawUI(x, y, 2);
		}
	}
	
	// Create third green box
	for (var y = 12; y < 17; y++) {
		for (var x = 4; x < 19; x++) {
			playground[getToken(x, y)] = 2;
			drawUI(x, y, 2);
		}
	}
	
	// Create last blue box
	for (var y = 1; y < 18; y++) {
		for (var x = 2; x < 3; x++) {
			playground[getToken(x, y)] = 3;
			drawUI(x, y, 3);
		}
	}
}

function drawUI(x, y, color) {
	var tileWidth = 30;
	var tileHeight = 30;
	
	// If tile already exist, change tile color
	if ($(`#${getToken(x, y)}`).length) {
		$(`#${getToken(x, y)}`).css('background-color', colorScheme[color]);
	} else {
		getPlaygroundDom().append(
			`<div id="${getToken(x, y)}" class="tile" style="background-color:${colorScheme[color]}; left:${x * tileWidth}px; top:${y * tileHeight}px; width:${tileWidth}px; height:${tileHeight}px;" onclick="onClickTile(this.id)"></div>`
		);
	}
}

function getPlaygroundDom() {
	return $('#playground');
}

function getToken(x, y) {
	return `tile-${x}-${y}`;
}

function onClickTile(id) {
	// If different color
	if (playground[id] != currentSelectedColorIdx) {
		
	}
}

function selectColor(color) {
	currentSelectedColorIdx = color;
}