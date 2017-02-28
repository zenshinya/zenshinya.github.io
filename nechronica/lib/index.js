$(document).ready(function() {
    initialiseLanguageDropdown();
});

/**
 *
 * Create language dropdown
 *
 */
function initialiseLanguageDropdown() {
	var flags = [
		'<img class="flag" src="image/us.png" /><span data-localize="MSG_LANGUAGE_ENGLISH">English</span><span class="value">EN</span>',
		'<img class="flag" src="image/jp.png" /><span data-localize="MSG_LANGUAGE_JAPANESE">Japanese</span><span class="value">JP</span>'
	];
	
	var dropdownHtml = '<dt><a href="#"><span>' + flags[0] + '</span></a></dt><dd><ul>';
	for(var i = 0; i < flags.length; i++) {
		dropdownHtml += '<li><a href="#">' + flags[i] + '</a></li>';
	}
	dropdownHtml += '</ul></dd>';
	$(".dropdown").html(dropdownHtml);

	$(".dropdown dt a").click(function() {
		$(".dropdown dd ul").toggle();
	});
				
	$(".dropdown dd ul li a").click(function() {
		var text = $(this).html();
		$(".dropdown dt a span").html(text);
		$(".dropdown dd ul").hide();
		$("[data-localize]").localize("text/labels", { language: getSelectedValue("dropdown") })
	});
				
	function getSelectedValue(id) {
		return $("#" + id).find("dt a span.value").html();
	}

	$(document).bind('click', function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass("dropdown"))
			$(".dropdown dd ul").hide();
	});
}