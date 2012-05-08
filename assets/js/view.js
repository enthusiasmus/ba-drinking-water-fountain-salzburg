var MapView = Backbone.View.extend({	
	el: $("#map_canvas"),
	initialize: function() {
		this.render();
	},	
	render: function(){
		var myOptions = {
      center: new google.maps.LatLng(this.model.get('centerLatitude'), this.model.get('centerLongitude')),
      zoom: this.model.get('zoom'),
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
	userLocationMarker: new google.maps.Marker({map: null}),
	userLocationPrecisionCircle: "",
	addMarkerCollection: function(markerCollection){
		this.markerCollection = markerCollection;
	},
	placeMarkersToMap: function(){
		var markerArray = [];
		var self = this;
		var infoWindow = new Object();
		
		userLocationMarker = this.userLocationMarker;
		google.maps.Marker.prototype.content = "";
		_.each(this.markerCollection.toArray(), function(markerModel){ 

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
				icon: markerModel.get('imageUrl'),
				title: markerModel.get("title"),
				content: markerModel.get('title'),
			});
			
			infoWindow = new google.maps.InfoWindow({
		    disableAutoPan: false
			});
			
			google.maps.event.addListener(marker, 'click', function(){				
				var infoContent = marker.content;
				
				if(self.userLocationMarker.getMap()){
					var distanceUserLocationToMarker = google.maps.geometry.spherical.computeDistanceBetween(
						new google.maps.LatLng(
							self.userLocationMarker.getPosition().lat(),
							self.userLocationMarker.getPosition().lng()
						),
						new google.maps.LatLng(
							marker.getPosition().lat(),
							marker.getPosition().lng()
						)
					);
					var distanceInKm = (distanceUserLocationToMarker/1000).toFixed(1) + " km";
					infoContent += "<br>Distanz: " + distanceInKm;
				}
				
				infoWindow.setContent(infoContent);
				infoWindow.open(self.map, marker);
			});

			google.maps.event.addListener(marker, 'dblclick', function() {
				self.map.setZoom(16);
				self.map.setCenter(marker.getPosition());
			});
			
			markerArray.push(marker); 
		});

		this.markerCluster = new MarkerClusterer(this.map, markerArray);
		google.maps.event.addListener(this.map, 'click', function() {
			infoWindow.close();
	  });
	},
	removeMarkersFromMap: function(){
		this.markerCluster.clearMarkers();
	},
	placePositionMarker: function(markerModel){
		var userLocationPrecisionCircleOptions = {
			strokeColor: markerModel.get("precisionStrokeColor"),
		  strokeOpacity: markerModel.get("precisionStrokeOpacity"),
		  strokeWeight: markerModel.get("precisionStrokeWeight"),
		  fillColor: markerModel.get("precisionFillColor"),
		  fillOpacity: markerModel.get("precisionFillOpacity"),
		  map: this.map,
		  center: new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
		  radius: markerModel.get("precision")
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
	},
	centerUserLocation: function(userLocationModel){
		var latitude = userLocationModel.get("latitude");
		var longitude = userLocationModel.get("longitude");
		var centerPoint = new google.maps.LatLng(latitude, longitude);
		var userLocationCircle = new google.maps.Circle();
    userLocationCircle.setRadius(userLocationModel.get("precision"));
    userLocationCircle.setCenter(centerPoint);

		this.map.fitBounds(userLocationCircle.getBounds());
	},
	removePositionMarker: function(){
		if(this.userLocationMarker){
			this.userLocationMarker.setMap(null);
			this.userLocationMarker = null;
		}
		if(this.userLocationPrecisionCircle){
			this.userLocationPrecisionCircle.setMap(null);
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
