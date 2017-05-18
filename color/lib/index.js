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
var maxWidth = 20;
var maxHeight = 20;

function initialize() {
	// Initialise playground
	for (var y = 0; y < maxHeight; y++) {
		for (var x = 0; x < maxWidth; x++) {
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

function reduceToken(id) {
	var position = id.split(/^tile-(\d{1,2})-(\d{1,2})$/);
	return {
		x: parseInt(position[1], 10),
		y: parseInt(position[2], 10)
	};
}

function onClickTile(id) {
	// If different color
	if (playground[id] != currentSelectedColorIdx) {
		flipColorProgress(id, playground[id], currentSelectedColorIdx);
	}
}

function flipColorProgress(id, originalColorIdx, colorIdx) {
	var queue = new Array();
	var alreadyAdded = new Array();
	
	queue.push(id);
	
	var count = 0;
	
	while(queue.length > 0) {
		var currentTile = queue.shift();
		alreadyAdded.push(currentTile);
		
		var position = reduceToken(currentTile);
		drawUI(position.x, position.y, colorIdx);
		playground[currentTile] = colorIdx;
		
		// Check top
		if (position.y - 1 >= 0 && isSameBlob(position.x, position.y - 1, originalColorIdx, queue, alreadyAdded)) {
			queue.push(getToken(position.x, position.y - 1));
		}
		
		
		// Check bottom
		if (position.y + 1 < maxHeight && isSameBlob(position.x, position.y + 1, originalColorIdx, queue, alreadyAdded)) {
			queue.push(getToken(position.x, position.y + 1));
		}
		
		// Check left
		if (position.x - 1 >= 0 && isSameBlob(position.x - 1, position.y, originalColorIdx, queue, alreadyAdded)) {
			queue.push(getToken(position.x - 1, position.y));
		}
		
		// Check right
		if (position.x + 1 < maxWidth && isSameBlob(position.x + 1, position.y, originalColorIdx, queue, alreadyAdded)) {
			queue.push(getToken(position.x + 1, position.y));
		}
	}
}

function isSameBlob(x, y, colorIdx, queue, alreadyAdded) {
	return queue.indexOf(getToken(x, y)) < 0 &&
			alreadyAdded.indexOf(getToken(x, y)) < 0 &&
			playground[getToken(x, y)] == colorIdx;
}

function selectColor(color) {
	currentSelectedColorIdx = color;
}