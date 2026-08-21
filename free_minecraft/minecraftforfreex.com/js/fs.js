var fsButton = document.querySelector('#fsButton');
fsButton.addEventListener('click', fullscreen);

function fullscreen() {
	$('#game').toggleClass('fullscreen');
	$('.fs').toggleClass('fullscreen');
	$('.navbar').toggleClass('hide');
	$('.footer').toggleClass('hide');
	$("body").toggleClass("noscroll");
	//$('[class^=mmt-]').toggleClass("hide");
	$('.adsbygoogle').toggleClass("hide");
	//$('.adsbygoogle').attr('style','display:none !important');
	
}
