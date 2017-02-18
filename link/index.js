/*********************
Xie Zhenjia
Link Shortener Example
2017-02-18
**********************/

var hashTable = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 'a',
	11: 'b',
	12: 'c',
	13: 'd',
	14: 'e',
	15: 'f',
	16: 'g',
	17: 'h',
	18: 'i',
	19: 'j',
	20: 'k',
	21: 'l',
	22: 'm',
	23: 'n',
	24: 'o',
	25: 'p',
	26: 'q',
	27: 'r',
	28: 's',
	29: 't',
	30: 'u',
	31: 'v',
	32: 'w',
	33: 'x',
	34: 'y',
	35: 'z',
	36: 'A',
	37: 'B',
	38: 'C',
	39: 'D',
	40: 'E',
	41: 'F',
	42: 'G',
	43: 'H',
	44: 'I',
	45: 'J',
	46: 'K',
	47: 'L',
	48: 'M',
	49: 'N',
	50: 'O',
	51: 'P',
	52: 'Q',
	53: 'R',
	54: 'S',
	55: 'T',
	56: 'U',
	57: 'V',
	58: 'W',
	59: 'X',
	60: 'Y',
	61: 'Z'
};

// Create an inverted hash table
var hashTableInverse = {};
Object.keys(hashTable).forEach(function (key) {
	hashTableInverse[hashTable[key]] = key;
});

var COMPANY_LINK = 'http://xyz.com/';

// Create a sample of database
var insertId = 5;
var database = {
	1: COMPANY_LINK + 'product/digital-product-watch-big-1304',
	2: COMPANY_LINK + 'product/digital-product-watch-red-small-blue-frame-43',
	3: COMPANY_LINK + 'product/digital-product-iphone-6s-5',
	4: COMPANY_LINK + 'product/digital-product-iphone-5-edge-88'
};

// Create a history of user-generated shortened links
var shortenedLinkHistory = [];

$(function() {
	displayDatabase();
	displayDatabaseId();
});

function insertLink() {
	var originalLink = $('#link').val();
	
	// Check whether is it from correct company link
	if (!originalLink.startsWith(COMPANY_LINK + 'product/')) {
		window.alert('Wrong company link!');
		return;
	}
	
	// Check whether there is a product url
	if (originalLink.replace(COMPANY_LINK + 'product/', '').length == 0) {
		window.alert('Wrong product link!');
		return;
	}
	
	// Check whether the link is already inside database
	if (Object.values(database).indexOf(originalLink) >= 0) {
		window.alert('Link already exists!');
		return;
	}
	
	database[insertId] = originalLink;
	getShortLink(insertId);
	
	insertId++;
	displayDatabase();
	displayDatabaseId();
}

function getShortLink(id) {
	var shortLink = COMPANY_LINK + shortenLink(id);
	$('#shortLink').text(shortLink);
	$('#shortLinkDiv').show();
	
	shortenedLinkHistory.push(shortLink);
	
	displayHistory();
}

function shortenLink(id) {
	var number = id;
	var hashCode = [];
	while (number > Object.keys(hashTable).length) {
		var quotient = Math.floor(number / Object.keys(hashTable).length);
		var remainder = number % Object.keys(hashTable).length;
		
		hashCode.unshift(hashTable[remainder]);
		number = quotient;
	}
	hashCode.unshift(hashTable[number]);
	
	return hashCode.join('');
}

function displayDatabase() {
	$("#database").text('');
	Object.keys(database).forEach(function (key) {
		$("#database").append(key + ': ' + database[key] + '<br/>');
	});
}

function displayHistory() {
	$("#history").text('');
	shortenedLinkHistory.forEach(function (key) {
		$("#history").append(key + '<br/>');
	});
}

function randomSerial() {
	insertId += Math.floor( Math.random() * 10000 ) + 1;
	displayDatabaseId();
}

function displayDatabaseId() {
	$('#serialId').text(insertId);
}

function getOriginalLink() {
	var shortLink = $('#inputShortLink').val();
	
	// Check whether is it from correct company link
	if (!shortLink.startsWith(COMPANY_LINK)) {
		window.alert('Wrong company link!');
		return;
	}
	
	var linkId = shortLink.replace(COMPANY_LINK, '');
	
	// Check whether is it valid short link
	if (linkId.replace(/[^a-zA-Z0-9]/gi,'') != linkId) {
		window.alert('Invalid short link!');
		return;
	}
	
	var hashCode = linkId.split('');
	var id = 0;

	for(var i = 0; i < hashCode.length; i++) {
		var power = Math.pow(Object.keys(hashTableInverse).length, hashCode.length - i - 1);
		id += parseInt(hashTableInverse[linkId[i]]) * power;
	}
	
	// Check whether id exists in database
	if (Object.keys(database).indexOf(id.toString()) < 0) {
		window.alert('Invalid short link!');
		return;
	}
	
	var originalLink = database[id];
	$('#originalLink').text(originalLink);
	$('#originalLinkDiv').show();
}