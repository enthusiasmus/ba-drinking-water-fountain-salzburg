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
			google.maps.event.addListener(marker, 'dblclick', function() {
				map.setZoom(14);
				map.setCenter(marker.getPosition());
			});
			markerArray.push(marker);
		});
		this.markerCluster = new MarkerClusterer(this.map, markerArray);
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
		
		this.map.setCenter(new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")));
    this.map.setZoom(markerModel.get("initialZoom"));
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
			fourth: { title: "News", url: "#rss" },
			fifth: { title: "Info", url: "#about" },
		};
		
		var template = _.template( $('#navigation_template').html(), variables );
		$(this.el).html(template);
	}
});
