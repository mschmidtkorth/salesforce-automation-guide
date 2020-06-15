/*$(document).ready(function () {
	jQuery(".tabs").tabs();
	jQuery(".subtabs").tabs();
	jQuery(".subsubtabs").tabs();

	openParentTab();
});*/

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

function showAllCharts() {
	$('#charts').toggle();
	$('#charts').html('<a href="./images/spiderChart/ratingFlow.png" target="_blank"><img src="./images/spiderChart/ratingFlow.png" alt="Rating for Flows." width="25%" /></a><a href="./images/spiderChart/ratingProcess.png" target="_blank"><img src="./images/spiderChart/ratingProcess.png" alt="Rating for Process Builder." width="25%" /></a><a href="./images/spiderChart/ratingWorkflow.png" target="_blank"><img src="./images/spiderChart/ratingWorkflow.png" alt="Rating for Wokflows." width="25%" /></a><a href="./images/spiderChart/ratingApex.png" target="_blank"><img src="./images/spiderChart/ratingApex.png" alt="Rating for Apex." width="25%" /></a>');
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

// Convert d3 svg to png - issue: Does not work for multiple svgs; furthermore
// Source: http://bl.ocks.org/vicapow/758fce6aa4c5195d24be
// function svgAsPng() {
// 	var doctype = '<?xml version="1.0" standalone="no"?>' +
// 		'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

// 	// serialize our SVG XML to a string.
// 	var source = (new XMLSerializer()).serializeToString(d3.select('svg').node());

// 	// create a file blob of our SVG.
// 	var blob = new Blob([doctype + source], {
// 		type: 'image/svg+xml;charset=utf-8'
// 	});

// 	var url = window.URL.createObjectURL(blob);

// 	// Put the svg into an image tag so that the Canvas element can read it in.
// 	var img = d3.select('body').append('img')
// 		.attr('width', 100)
// 		.attr('height', 100)
// 		.node();

// 	img.onload = function () {
// 		// Now that the image has loaded, put the image into a canvas element.
// 		var canvas = d3.select('body').append('canvas').node();
// 		canvas.width = 100;
// 		canvas.height = 100;
// 		var ctx = canvas.getContext('2d');
// 		ctx.drawImage(img, 0, 0);
// 		var canvasUrl = canvas.toDataURL("image/png");
// 		var img2 = d3.select('body').append('img')
// 			.attr('width', 100)
// 			.attr('height', 100)
// 			.node();
// 		// this is now the base64 encoded version of our PNG! you could optionally
// 		// redirect the user to download the PNG by sending them to the url with
// 		// `window.location.href= canvasUrl`.
// 		img2.src = canvasUrl;
// 		console.log(canvasUrl)
// 		//window.location.href = canvasUrl;
// 	};
// 	// start loading the image.
// 	img.src = url;
// }