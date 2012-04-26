var MapView = Backbone.View.extend({
	el: $("#map_canvas"),
	initialize: function() {
		this.render();
	},
	render: function(){
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
	
		this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		var template = _.template( $('#map_template').html() );
		$(this.el).html(template);
	},
	events: {

	},
	markerCollection: "",
	map: "",
	markerCluster: "",
	userLocationMarker: "", 
	userLocationPrecisionCircle: "",
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
			
			var infoBubble = new InfoBubble({
				map: map,
				maxWidth: 290,
				maxHeight: 320,
				shadowStyle: 0,
				padding: 0,
				backgroundColor: '#fff',
				borderRadius: 5,
				arrowSize: 20,
				borderWidth: 0,
				arrowPosition: 20,
				backgroundClassName: 'ejw-gruppe-infowindow',
				arrowStyle: 2,
				hideCloseButton: false
			});   
			
			google.maps.event.addListener(marker, 'click', function() {
			  infoBubble.open(this.map,marker);
			});
			google.maps.event.addListener(marker, 'dblclick', function() {
				this.map.setZoom(16);
				this.map.setCenter(marker.getPosition());
			});
			markerArray.push(marker);
		});
		this.markerCluster = new MarkerClusterer(this.map, markerArray);
	},
	removeMarkersFromMap: function(){
		this.markerCluster.clearMarkers();
	},
	placePositionMarker: function(markerModel, shouldCenterMap){

		var userLocationPrecisionCircleOptions = {
			strokeColor: markerModel.get("precisionStrokeColor"),
		  strokeOpacity: markerModel.get("precisionStrokeOpacity"),
		  strokeWeight: markerModel.get("precisionStrokeWeight"),
		  fillColor: markerModel.get("precisionFillColor"),
		  fillOpacity: markerModel.get("precisionFillOpacity"),
		  map: this.map,
		  center: new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
		  radius: markerModel.get("precisionRadius")
		};
		this.userLocationPrecisionCircle = new google.maps.Circle(userLocationPrecisionCircleOptions);
    
		var icon = new google.maps.MarkerImage(
			markerModel.get("imageUrl"),
    	new google.maps.Size(markerModel.get("imageWidth"), markerModel.get("imageHeight")),
    	new google.maps.Point(markerModel.get("imageOriginX"),markerModel.get("imageOriginX")),
    	new google.maps.Point(markerModel.get("imageAnchorX"), markerModel.get("imageAnchorY")));

		this.userLocationMarker = new google.maps.Marker({
		 	map: this.map,
		  icon: icon,
		  title: markerModel.get("title"),
		  position: new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude"))
		});
		
		if(shouldCenterMap){
			this.map.setCenter(new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")));
	    this.map.setZoom(markerModel.get("initialZoom"));
	 	}
	},
	removePositionMarker: function(){
		if(this.userLocationMarker){
			this.userLocationMarker.setMap(0);
			this.userLocationMarker = null;
		}
		if(this.userLocationPrecisionCircle){
			this.userLocationPrecisionCircle.setMap(0);
			this.userLocationPrecisionCircle = null;
		}
	}
});

var NavigationView = Backbone.View.extend({
	el: $("#navigation"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var variables = {
			first: { title: "Position", url: "javascript:void(0)", onclick: "getUserLocation()" },
			second: { title: "Brunnen", url: "#next" },
			third: { title: "Suche", url: "#search" },
			fourth: { title: "News", url: "#feed" },
			fifth: { title: "Info", url: "#about" },
		};
		
		var template = _.template( $('#navigation_template').html(), variables );
		$(this.el).html(template);
	}
});

var FeedView = Backbone.View.extend({
	el: $("#feed"),
	feedItemCollection: "",
	initialize: function() {
		
	},
	addFeedItemCollection: function(feedItemCollection) {
		this.feedItemCollection = feedItemCollection;
		this.render();
	},
	render: function() {
		var template = _.template( $('#feed_template').html());
		$(this.el).html(template);

		$('.loading').hide();

		_.each(this.feedItemCollection.toArray(), function(feedItem) {
			$('#rss').append(
	    	'<article>' + 
	    	'<h3 class="feed-title"><a href="' + feedItem.get('link') + '">' + feedItem.get('title') + '</a></h3>' + 
	    	'<p class="feed-date">' + feedItem.get('pubDate') + '</p>' + 
	 			'<div class="feed-content">' + feedItem.get('description') + '</div>' +
	    	'</article>'
    	);
		});
	}
	
});
