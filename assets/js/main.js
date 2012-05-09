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
});

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
var adressView = new AdressView;
adressView.mapView = mapView;


function placeMarkers(data){
	for(idx in data){
		var markerModel = new MarkerModel({
			latitude: data[idx].latitude, 
			longitude: data[idx].longitude, 
			title: data[idx].f_key + ": " + data[idx].water_distributor + " - " + data[idx].fontain_name
		});
		markerCollection.push(markerModel, []);
	}
	mapView.addMarkerCollection(markerCollection);
	mapView.placeMarkersToMap();
}

function getFeedItems(xml) {
	$(xml).find('item').each(function() {
		var feedItemModel = new FeedItemModel({
			title: $(this).find('title').text(), 
			link: $(this).find('link').text(),
			pubDate: $.format.date($(this).find('pubDate').text(), 'dd. MMMM yyyy HH:mm:ss'),
			description: $(this).find('description').text()
		});
		feedItemCollection.push(feedItemModel, []);
  });
	feedView.addFeedItemCollection(feedItemCollection);
}