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
	$('#map_canvas').height(window.innerHeight - 40);
});

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    
window.addEventListener(orientationEvent, function() {
	$('#map_canvas').height(window.innerHeight - 40);
  mapView.resizeMap();
}, false);

var appRouter = new AppRouter();

var mapModel = new MapModel;		
var feedModel = new FeedModel;
var userLocationModel = new UserLocationModel;
var markerCollection = new MarkerCollection;
var feedItemCollection = new FeedItemCollection;

var mapView = new MapView({model: mapModel});
var navView = new NavigationView;
var feedView = new FeedView;
var infoView = new InfoView;
var maptypeView = new MaptypeView;
var adressView = new AdressView;

adressView.mapView = mapView;
maptypeView.mapView = mapView;