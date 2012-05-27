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
	markerCollection: undefined,
	map: undefined,
	markerCluster: undefined,
	userLocation: undefined,
	userLocationMarker: new google.maps.Marker({map: null}),
	userLocationPrecisionCircle: undefined,
	directionsDisplay: undefined,
	directionsService: undefined,
	resizeMap: function(){
		google.maps.event.trigger(this.map, 'resize');
	},
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
				zIndex: 1
			});
			
			infoWindow = new google.maps.InfoWindow({
			});
			
			google.maps.event.addListener(marker, 'click', function(){				
				var infoContent = marker.content;
				var distanceInformation = self.distanceNextFountain(self.userLocationMarker.getPosition(), marker.getPosition());
				if(distanceInformation)
					infoContent += "<br>Distanz: " + distanceInformation;			
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
	distanceNextFountain: function(userPosition, markerPosition){
		if(userPosition && markerPosition){
			var distanceUserLocationToMarker = google.maps.geometry.spherical.computeDistanceBetween(
				userPosition,
				markerPosition);
			var distanceInKm = (distanceUserLocationToMarker/1000).toFixed(3) + " km";
			return distanceInKm;
		}
		return false;
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
		  radius: markerModel.get("precision"),
		  zIndex: 9999
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
			  position: new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
			  zIndex: 9999
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
	},
	drawRouteUserLocationToNextSpring: function(){
		if(!this.userLocationMarker.getMap()){
			console.log("Kein Startpunkt steht zur Verfügung!");
			return;
		}

		var distanceToNextFontain = tempShortestDistance = 0;
		var nearestMarker = new google.maps.Marker();
		var self = this;
		_.each(this.markerCollection.toArray(), function(markerModel){ 		
			tempShortestDistance = google.maps.geometry.spherical.computeDistanceBetween(
				new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
				self.userLocationMarker.getPosition()
			);

			if(distanceToNextFontain == 0)
				distanceToNextFontain = tempShortestDistance;
			
			if(distanceToNextFontain > tempShortestDistance){
				distanceToNextFontain = tempShortestDistance;
				nearestMarker.setPosition(new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")));
			}
		});
		
		if(self.directionsDisplay)
			self.directionsDisplay.setMap(null);
			
		self.directionsDisplay = new google.maps.DirectionsRenderer({
			draggable: false,
			suppressMarkers: true,
			suppressInfoWindows: true,
			map: self.map	
		});

	  var request = {
	    origin: self.userLocationMarker.getPosition(),
	    destination: nearestMarker.getPosition(),
	    travelMode: google.maps.TravelMode.WALKING
	  };
	  
		self.directionsService = new google.maps.DirectionsService();
	  self.directionsService.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      self.directionsDisplay.setDirections(result);
	    }
	  });
	}
});

var NavigationView = Backbone.View.extend({
	el: $("#navigation"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var variables = {
			first: { title: "Position", url: "#position", onclick: "" },
			second: { title: "Adresse", url: "#adress", onclick: "" },
			third: { title: "Brunnen", url: "#next", onclick: "" },
			fourth: { title: "News", url: "#feed" },
			fifth: { title: "Kartentyp", url: "#maptype", onclick: "" },
			sixth: { title: "Info", url: "#about" },
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
		
		// var allFeedImages = document.getElementsByTagName('img')
		// for(idx in allFeedImages){
    	// if(allFeedImages[idx].width > 100){
    		// var scaleValue = 100/allFeedImages[idx].width;
    		// allFeedImages[idx].width = 100;
    		// allFeedImages[idx].height = allFeedImages[idx].height*scaleValue;
    	// }
		// }
	}
});

var AdressView = Backbone.View.extend({
	el: $("#adress"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var template = _.template( $('#searchAdressTemplate').html());
		$(this.el).html(template);
	},
	show: function(){
		$(this.el).show();
	},
	hide: function(){
		$(this.el).hide();
	},
	switchVisibility: function(){
		$(this.el).toggle();
	},
	mapView: "",
	currentMarker: "",
	events: {
		'click input[type=button]': 'searchAdress'
	},
	searchAdress: function(){
		var geocoder = new google.maps.Geocoder();
    var address = $('input[name=adress]').val();
		
		var self = this;
    geocoder.geocode({ 'address': address}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK){
        self.mapView.map.setCenter(results[0].geometry.location);
        self.mapView.map.setZoom(9);
        
        if(self.currentMarker){
        	self.currentMarker.setMap(null);
        	self.currentMarker = null;
        }
        	
        self.currentMarker = new google.maps.Marker({
            map: self.mapView.map,
            position: results[0].geometry.location
        });
      }
      else{
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
	}
});

var MaptypeView = Backbone.View.extend({
	el: $("#maptype"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var template = _.template( $('#maptype_template').html());
		$(this.el).html(template);
	},
	mapView: "",
	changeTyp: function(id) {

		//attention: id isn't a number yet
		id *= 1;

		switch(id)
		{
			case 1:
				self.mapView.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			break;

			case 2:
				self.mapView.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			break;

			case 3:
				self.mapView.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
			break;

			case 4:
				self.mapView.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
			break;
		}

	}
});

var InfoView = Backbone.View.extend({
	el: $('#info'),
	initialize: function() {
		this.render();
	},
	render: function() {
		var template = _.template( $('#info_template').html());
		$(this.el).html(template);
	}	
});
