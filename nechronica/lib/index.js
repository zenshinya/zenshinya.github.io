$(document).ready(function() {
	initialise();
	
	$('#navTabs a').not(".dropdown-toggle").click(function (e) {
		$(this).tab('show');
	})
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