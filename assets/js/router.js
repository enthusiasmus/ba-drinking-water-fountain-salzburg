var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "maptyp/:id": "setMaptyp",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  index: function() {
  	$.ajax({
			async: true,
			dataType: "json",
			timeoutNumber: 5000,
			url: "db/elements.php",
			success: function(data){
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
			},
			error: function(data){
				alert("Die Trinkbrunnen konnten nicht geladen werden!");
			}
		});
		this.displayOnly("map_canvas");	
  },
  showAdressSearch: function(){
  	adressView.switchVisibility();
		this.displayOnly("map_canvas");	
  },
  showRssFeed: function(){	
		$.get('rss.php', {
		  feed_url:'http://www.seppeisl.at/modules/news/rss2.php?page_id=1&group_id=7',
		}, function(xml){
			$(xml).find('item').each(function(){
				var feedItemModel = new FeedItemModel({
					title: $(this).find('title').text(), 
					link: $(this).find('link').text(),
					pubDate: $.format.date($(this).find('pubDate').text(), 'dd. MMMM yyyy HH:mm:ss'),
					description: $(this).find('description').text()
				});
				feedItemCollection.push(feedItemModel, []);
		  });
			feedView.addFeedItemCollection(feedItemCollection);
		});
 		this.displayOnly("feed");	
  },
  setMaptyp: function(typ) {
  },
  showAbout: function(){
		this.displayOnly("info");
  },
  defaultRoute: function( action ){
		this.displayOnly("map_canvas");
  },
  mainElements: new Array("adress", "map_canvas", "feed", "info"),
  displayOnly: function(elementToShow){
		for(idx in this.mainElements) {
		  if(elementToShow != this.mainElements[idx])
		  	$('#'+this.mainElements[idx]).hide();
		  else
		  	$('#'+this.mainElements[idx]).show();
		}
  }
});