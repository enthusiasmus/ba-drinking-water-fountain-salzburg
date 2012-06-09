var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
    "feed": "showRssFeed",
    "route/:id": "routeToFountain",
    "maptype/:type": "changeMaptype",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  initialize: function(){   
    this.loadingView = new LoadingView;
    this.mapModel = new MapModel;   
    this.feedModel = new FeedModel;
    this.userLocationModel = new UserLocationModel;
    this.markerCollection = new MarkerCollection;
    this.markerCollection.url = 'db/elements.php';
    this.feedItemCollection = new FeedItemCollection;
    this.feedItemCollection.url = 'rss.php';
    
    this.mapView = new MapView({model: this.mapModel});
    this.feedView = new FeedView;
    this.infoView = new InfoView;
    this.mapTypeView = new MapTypeView;
    this.addressView = new AddressView;
    
    this.addressView.mapView = this.mapView;
    this.mapTypeView.mapView = this.mapView;

    this.eventDispatcher = {};
    _.extend(this.eventDispatcher, Backbone.Events);

  },
  init: function(){
    try{
      if(!(Backbone.history.start()))
        throw "Couldn't start backbone history!";
    }
    catch(e){
      console.log(e);
    }
    
    var self = this;
    this.markerCollection.fetch({
      success: function(){
        self.mapView.addMarkerCollection(self.markerCollection);
        self.mapView.placeMarkersToMap();
      },
      error: function(){
        alert("Trinkbrunnen konnten nicht geladen werden!");
      },
      add: true
    });
  },
  index: function(){
    var currentCenter = this.mapView.map.getCenter();
  	this.displayOnly('map_canvas');
    this.mapView.map.setCenter(currentCenter);
  },
  nextFountain: function(){
    this.navigate("", {trigger: true});
    this.displayOnly('map_canvas'); 
    if(this.mapView.directionsDisplay){
      this.mapView.hideRoute();
      return;
    }
    
    this.calculateGeoLocation('route');
    
    var self = this;
    this.eventDispatcher.on('drawRoute', function() {
      self.mapView.drawRouteUserLocationToNextFountain(); 
      self.eventDispatcher.off('drawRoute');  
    });
  },
  routeToFountain: function(id){
    console.log('Route to Fontain will be calculated');
  },
  showAddressSearch: function(){
    this.navigate("", {trigger: true});
    
    var isVisible = $('#address').is(':visible');
    this.displayOnly('map_canvas');
    if(!isVisible){
      $('#address').show();
    }

		$('input[type=button]').click(function(){
		  dispatcher.trigger()
		});
  },
  showMaptype: function(){
    this.navigate("", {trigger: true});
    
    var isVisible = $('#maptype').is(':visible');
    this.displayOnly('map_canvas');
    if(!isVisible){
      $('#maptype').show();
    }
  },
  changeMaptype: function(type){
		this.displayOnly('map_canvas');	
		this.mapTypeView.changeType(type);
  },
  showRssFeed: function(){	
  	this.displayOnly('feed');
		var self = this;

    if(this.feedView.timestamp < new Date().getTime() - 60*60*12){
      this.getLoadingView();
      this.feedItemCollection.fetch({
        success: function(){
          self.feedView.addFeedItemCollection(self.feedItemCollection);
          self.feedView.timestamp = new Date().getTime();
          self.eventDispatcher.trigger('hideLoadingView');
        },
        error: function(){
          alert("Feed konnte nicht geladen werden!");
        },
        add: true
      });
    }
  },
  getUserLocation: function(){
    this.navigate("", {trigger: true});
		this.displayOnly('map_canvas');
    this.calculateGeoLocation();
  },
  calculateGeoLocation: function(eventtype){
    var self = this;
    if(navigator.geolocation){      
      navigator.geolocation.getCurrentPosition(function(position){
        var time = position.timestamp;
        var lat = position.coords.latitude; //dezimal Grad
        var lng = position.coords.longitude; //dezimal Grad
        var precision = position.coords.accuracy; //Meter
        var altitude = position.coords.altitude; //Meter
        var altitudeAcc = position.coords.altitudeAccuracy; //Meter
        var speed = position.coords.speed; //Meter pro Sek.
        var heading = position.coords.heading; //Grad von wahrem Norden
        
        self.userLocationModel.set({
          latitude: lat,
          longitude: lng,
          time: time,
          precision: precision,
          altitude: altitude,
          altitudeAcc: altitudeAcc,
          speed: speed,
          heading: heading
        });
  
        self.mapView.removeUserLocation();
        self.mapView.placeUserLocation(self.userLocationModel);
        self.mapView.centerUserLocation(self.userLocationModel);

        if(eventtype == 'route')
          self.eventDispatcher.trigger('drawRoute');
        else
          self.eventDispatcher.trigger('hideLoadingView');
        
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
  },
  showAbout: function(){
		this.displayOnly('info');
  },
  defaultRoute: function(){
  	console.log('no route for this URI!');
  },
  getLoadingView: function(){
    //removed for iphone presentation
  },
  mainElements: new Array('address', 'map_canvas', 'feed', 'info', 'maptype'),
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
  	
  	if($('#map_canvas').is(':visible'))
      google.maps.event.trigger(this.mapView.map, "resize");
  }
});