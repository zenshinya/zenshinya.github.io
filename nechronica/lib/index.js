$(document).ready(function() {
	initialise();
});

function initialise() {
    initialiseLanguageDropdown();
}

/**
 *
 * Create language dropdown
 *
 */
function initialiseLanguageDropdown() {	
	var INITIAL_LANGUAGE = 'en';
		
	$("#language-tab").html('<img class="flag" src="image/' + INITIAL_LANGUAGE + '.png" />');
	$("[data-localize]").localize("text/labels", { language: INITIAL_LANGUAGE })
	
	$(".dropdown ul li a").click(function() {
		var imgHtml = $(this).find("img").clone().get(0);
		$("#language-tab").html(imgHtml);
		$("[data-localize]").localize("text/labels", { language: imgHtml.name })
	});
}

function rollDice10(diceId, affectedField, additionalNum) {
	startRollDice(10, diceId, affectedField, additionalNum);
}

var DIE_ROLL_CD_INCREMENT = 200;

function startRollDice(maxNum, diceId, affectedField, additionalNum) {
	$('#' + diceId).addClass('dice-display');
	rollingDice(maxNum, diceId, affectedField, additionalNum, DIE_ROLL_CD_INCREMENT);
}

function rollingDice(maxNum, diceId, affectedField, additionalNum, i) {
	if(i == 0) {
		rotateDice(diceId, 0);
		return;
	}
	var randomNo = Math.floor(Math.random() * maxNum) + 1;
	$('#' + diceId).text(randomNo);
	$('#' + affectedField).val(randomNo + additionalNum);
	
	rotateDice(diceId, randomNo * 20);
	
	var timeOut = (DIE_ROLL_CD_INCREMENT - i * 1.5 * i) + 1; // Roll for 3s
	
	setTimeout(function() { rollingDice(maxNum, diceId, affectedField, additionalNum, --i); }, timeOut);
}

function rotateDice(diceId, degree) {
   // For webkit browsers: e.g. Chrome
   $('#' + diceId).css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
   // For Mozilla browser: e.g. Firefox
   $('#' + diceId).css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
}