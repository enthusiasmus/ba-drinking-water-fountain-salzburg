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
});

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
  appRouter.mapView.resizeMap();
}, false);

var appRouter = new AppRouter();

function logEvent(event) {
  console.log(event.type);
}

window.applicationCache.addEventListener('checking',logEvent,false);
window.applicationCache.addEventListener('noupdate',logEvent,false);
window.applicationCache.addEventListener('downloading',logEvent,false);
window.applicationCache.addEventListener('cached',logEvent,false);
window.applicationCache.addEventListener('updateready',logEvent,false);
window.applicationCache.addEventListener('obsolete',logEvent,false);
window.applicationCache.addEventListener('error',logEvent,false);  
