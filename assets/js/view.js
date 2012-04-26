var MapView = Backbone.View.extend({
	el: $("#map_canvas"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var myOptions = {
	        center: new google.maps.LatLng(47.500, 13.000),
	        zoom: 7,
	        keyboardShortcuts: false,
	        mapTypeControl: false,
	        panControl: false,
	        rotateControl: false,
	        streetViewControl: false,
	        scaleControl: true,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	
		this.mainMap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		var template = _.template( $('#map_template').html() );
		$(this.el).html(template);
	},
	events: {

	},
	addMarkerCollection: function(markerCollection){
		this.markerCollection = markerCollection;
	},
	placeMarkersToMap: function(){
		var markerArray = [];
		_.each(this.markerCollection.toArray(), function(marker){ 
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(marker.get("latitude"), marker.get("longitude")),
				icon: 'assets/img/marker.png',
				title: marker.get("title"),
			});
			google.maps.event.addListener(marker, 'dblclick', function() {
				mainMap.setZoom(14);
				mainMap.setCenter(marker.getPosition());
			});
			markerArray.push(marker);
		});
		this.markerCluster = new MarkerClusterer(this.mainMap, markerArray);
	},
	removeMarkersFromMap: function(){
		this.markerCluster.clearMarkers();
	},
	placePositionMarker: function(){
		var icon = new google.maps.MarkerImage(
			'assets/img/userlocation.png',
    	new google.maps.Size(24, 24),
    	new google.maps.Point(0,0),
    	new google.maps.Point(12, 12));

		userLocationMarker = new google.maps.Marker({
		 	map: this.mainMap,
		  icon: icon,
		  title: 'Userlocation',
		  position: new google.maps.LatLng(lat, lng)
		});
		
			    mainMap.setCenter(new google.maps.LatLng(lat, lng));
	    mainMap.setZoom(14);
	}
});

var NavigationView = Backbone.View.extend({
	el: $("#navigation"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var variables = {
			first: { title: "Position", url: "location" },
			second: { title: "Brunnen", url: "next" },
			third: { title: "Suche", url: "search" },
			fourth: { title: "News", url: "feed" },
			fifth: { title: "Info", url: "about" },
		};
		
		var template = _.template( $('#navigation_template').html(), variables );
		$(this.el).html(template);
	}
});

var FeedView = Backbone.View.extend({
	el: $("#feed"),
	initialize: function() {
		this.render();
	},
	addFeedItemCollection: function(feedItemCollection) {
		this.feedItemCollection = feedItemCollection;
	},
	render: function() {

		_.each(this.feedItemCollection.toArray(), function(feedItem) {
			alert(feedItem.get("title"));
		});

		// alert(feedItemModel.get("title"));

		/*var pubDate = $.format.date($(this).find('pubDate').text(), 'dd. MMMM yyyy HH:mm:ss');
    $('#rss').append(
    	'<article>' + 
    	'<h3 class="feed-title"><a href="' + $(this).find('link').text() + '">' + $(this).find('title').text() + '</a></h3>' + 
    	'<p class="feed-date">' + pubDate + '</p>' + 
 			'<div class="feed-content">' + $(this).find('description').text() + '</div>' +
    	'</article>'); */

		var template = _.template( $('#feed_template').html());
		$(this.el).html(template);
	}
	
});