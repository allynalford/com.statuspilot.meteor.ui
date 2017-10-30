Template.Home.onCreated(function() {
	
});

Template.Home.onDestroyed(function() {
	
});

Template.Home.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	
    $('#main-slider').flexslider({
        namespace           : "flex-",
        selector            : ".slides > li",
        animation           : "fade",
        easing              : "swing",
        direction           : "horizontal",
        reverse             : false,
        animationLoop       : true,
        smoothHeight        : false,
        startAt             : 0,
        slideshow           : true,
        slideshowSpeed      : 7000,
        animationSpeed      : 600,
        initDelay           : 0,
        randomize           : false,
         
        // Usability features
        pauseOnAction       : true,
        pauseOnHover        : false,
        useCSS              : true,
        touch               : true,
        video               : false,
         
        // Primary Controls
        controlNav          : true,
        directionNav        : true,
        prevText            : "Previous",
        nextText            : "Next",
         
        // Secondary Navigation
        keyboard            : true,
        multipleKeyboard    : false,
        mousewheel          : false,
        pausePlay           : false,
        pauseText           : 'Pause',
        playText            : 'Play',
         
        // Special properties
        controlsContainer   : "",
        manualControls      : "",
        sync                : "",
        asNavFor            : "",
	});

});

Template.Home.events({
	'click .fancybox': function(e) {
		e.preventDefault();
	}
});

Template.Home.helpers({
	
});