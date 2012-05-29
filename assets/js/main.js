$(document).ready(function(){
	//History uses iframes so the dom should be finished loading
	try{
		if(!(Backbone.history.start()))
			throw "Couldn't start backbone history!";
	}
	catch(e){
		console.log(e);
	}
	finally{
	}
	
	window.scrollTo(0, 1);
	$('#map_canvas').height(window.innerHeight - $('#navigation').height());
});

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    
window.addEventListener(orientationEvent, function() {
	$('#map_canvas').height(window.innerHeight - $('#navigation').height());
  appRouter.mapView.resizeMap();
}, false);

var appRouter = new AppRouter();

