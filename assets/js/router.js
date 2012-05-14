var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
  	"position": "showUserLocation",
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "next": "nextFountain",
    "maptype/:id": "setMaptype",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  index: function(){
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
  nextFountain: function(){
		this.displayOnly("map_canvas");	
  	mapView.drawRouteUserLocationToNextSpring()
  },
  showAdressSearch: function(){
		this.displayOnly("map_canvas adress");	
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
  setMaptyp: function(typ){
  	this.displayOnly("map_canvas");
  },
  showUserLocation: function(){
		if(navigator.geolocation){			
			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				var time = position.timestamp;
	      var lat = position.coords.latitude; //dezimal Grad
	      var lng = position.coords.longitude; //dezimal Grad
	      var precision = position.coords.accuracy; //Meter
	      var altitude = position.coords.altitude; //Meter
	      var altitudeAcc = position.coords.altitudeAccuracy; //Meter
	      var speed = position.coords.speed; //Meter pro Sek.
	      var heading = position.coords.heading; //Grad von wahrem Norden
				
	      userLocationModel.set({
	      	latitude: lat,
	      	longitude: lng,
	      	time: time,
	      	precision: precision,
	      	altitude: altitude,
	      	altitudeAcc: altitudeAcc,
	      	speed: speed,
	      	heading: heading
	      });
	
				mapView.removePositionMarker();
	      mapView.placePositionMarker(userLocationModel);
	    	mapView.centerUserLocation(userLocationModel);
			}, 
			function(error){
				switch(error.code) {
	        case error.PERMISSION_DENIED:
	        	alert("Zugriff auf Position wurde verweigert!");
	        	break;
	        case error.POSITION_UNAVAILABLE: 
	        	alert("Position konnte nicht ermittelt werden!");
	        	break;
	        case error.TIMEOUT:
	        	alert("Zeitüberschreitung beim Ermitteln der Position!");
	        	break;
	        case error.UNKNOWN_ERROR: 
	        	alert("Positionsbestimmung zur Zeit nicht möglich!");
	        	break;
	        default:
	        	alert("Fehler bei der Positionsbestimmung!");
	        	break;
	   		}
			},{enableHighAccuracy:true, timeout:5000, maximumAge:60000});
		}
		else{
			console.log("Ihr Browser unterstützt keine Positionsbestimmung!");
		}
		this.displayOnly("map_canvas");
  },
  showAbout: function(){
		this.displayOnly("info");
  },
  defaultRoute: function(){
  	
  },
  mainElements: new Array("adress", "map_canvas", "feed", "info", "maptyp"),
  displayOnly: function(elementsToShow){
  	var elementsArray = elementsToShow.split(" ");
  	var shouldShow;
  	
  	for(idx in this.mainElements){
  		shouldShow = false;
  		for(i in elementsArray){
  			if(elementsArray[i] == this.mainElements[idx]){
  				shouldShow = true;
  				break;
  			}
  		}
  		
  		if(shouldShow)
  			$('#'+this.mainElements[idx]).show();
  		else
  			$('#'+this.mainElements[idx]).hide();
  	}
  }
});