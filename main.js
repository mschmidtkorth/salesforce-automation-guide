$(document).ready(function () {
	jQuery(".tabs").tabs();
	jQuery(".subtabs").tabs();
	jQuery(".subsubtabs").tabs();

	openParentTab();
});

function openParentTab() {
	locationHash = location.hash.substring(1);
	if (locationHash) {
		var hash = jQuery('#' + locationHash);
		if (hash.length) {
			if (hash.closest(".tabContent").length) {
				var tabNumber = hash.closest(".tabContent").index();
				jQuery(".tabs.fix").tabs({
					active: tabNumber
				});
				hash.get(0).scrollIntoView();
				setTimeout(function () {
					hash.get(0).scrollIntoView();
				}, 1000);
			}
		}
	}
}

function showDetails(elem, identifier) {
	$('#' + identifier).toggle()
	elem.innerHTML = elem.innerHTML == 'Show Order of Execution from an automation perspective' ? 'Hide Order of Execution from an automation perspective' : 'Show Order of Execution from an automation perspective';
}

function mobileFullscreen() {
	$('#header').toggle();
	$('#footer').toggle();
	var maxButton = $('#maximize')
	if (maxButton.html() == 'open_in_full') {
		$('body').addClass('fullscreen');
		maxButton.html('close_fullscreen');
	} else {
		$('body').removeClass('fullscreen');
		maxButton.html('open_in_full');
	}
}