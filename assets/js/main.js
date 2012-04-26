$(document).ready(function(){
	//History uses iframes so the dom should be finished loading
	Backbone.history.start();
});

//reserved variables
var userLocationModel = new UserLocationModel;

//set routes
var appRouter = new AppRouter();

//initialize objects
var mapModel = new MapModel({title: "Google Map"});		
var feedModel = new FeedModel;

//set views
var mapView = new MapView;
var navView = new NavigationView;
var feedView = new FeedView;

var markerCollection = new MarkerCollection;
var feedItemCollection = new FeedItemCollection;

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
