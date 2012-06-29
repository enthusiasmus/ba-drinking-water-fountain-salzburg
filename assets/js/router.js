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

    if(!this.isMobile()){
      var self = this;
      $('#activatemap').mousedown(function(){self.scrollMap();});
    }
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
        console.error("Trinkbrunnen konnten nicht geladen werden!");
      },
      add: true
    });
  },
  index: function(){
    if ( this.isMobile() )
      this.displayOnly('map_canvas');
    else 
      this.displayOnly('map_canvas appinfo hand-phone');

    var currentCenter = this.mapView.map.getCenter();
    this.mapView.map.setCenter(currentCenter);
  },
  scrollMap: function(){
    var mapCenter = this.mapView.map.getCenter();
    
    if( $('#map-wrap').css('top') == '250px' ) {
      $('#map-wrap').css('min-height', '0px');
      $('#address').hide();
      $('#navigation').animate({
        opacity: 0
      }, 500, function() {
        $('#navigation').hide();
      });
      $('#map-wrap').animate({
        top: 544
      }, 1000, function(){
        $('#activatemap').show();
        $('#scroll').text('Karte vergrößern ↑');
        window.Trinkbrunnen.mapView.resizeMap();
        window.Trinkbrunnen.mapView.map.setCenter(mapCenter);
      });
      $('#appinfo, #info, #feed, #hand-phone').animate({
        opacity : 1
      }, 1000);
      if(this.routes[Backbone.history.fragment] == 'showRssFeed')
        $('#feed').css({'display': 'block'});
    } else {
      $('#map-wrap').animate({
        top: 250
      }, 1000, function(){
        $('#map-wrap').css('min-height', '294px');
        $('#navigation').show().animate({
          opacity: 1
        }, 500);
        window.Trinkbrunnen.mapView.resizeMap();
        window.Trinkbrunnen.mapView.map.setCenter(mapCenter);
        $('#activatemap').hide();
        $('#scroll').text('Karte verkleinern ↓');
      });
      $('#appinfo, #info, #feed, #hand-phone').animate({
        opacity : 0
      }, 1000);
      $('#feed').css('display', 'none');
    }
  },
  nextFountain: function() {
    this.navigate("", {trigger: true});

    if ( this.isMobile() ) {
      this.displayOnly('map_canvas');
      $('#header-navigation').show();
    } else {
      this.displayOnly('map_canvas appinfo hand-phone');
    }

    if(this.mapView.directionsDisplay){
      this.mapView.hideRoute();
      return;
    }
    
    this.calculateGeoLocation('drawRoute');
    
    var self = this;
    this.eventDispatcher.on('drawRoute', function() {
      self.mapView.drawRouteUserLocationToNextFountain(); 
      self.eventDispatcher.off('drawRoute');  
    });
  },
  routeToFountain: function(id) {
    this.calculateGeoLocation('drawRouteTo');

    var self = this;
    this.eventDispatcher.on('drawRouteTo', function(){
      self.mapView.drawRouteUserLocationToFountain(id);
      self.eventDispatcher.off('drawRouteTo');
    });
  },
  showAddressSearch: function() {
    this.navigate("", {trigger: true});

    if ( this.isMobile() ) {
      this.displayOnly('map_canvas');
      $('#header-navigation').show();
      
      $('input[name=address]').blur(function(){
        $('#address').hide();
      });
    } else {
      this.displayOnly('map_canvas appinfo hand-phone');
    }
    
    $('#address').show();
    $('input[name=address]').focus().select();
  },
  showMaptype: function(){
    if ( this.isMobile() )
      $('#header-navigation').show();

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
  showRssFeed: function() {	
    this.navigate("feed", {trigger: true});

    $('#feed').css('display', 'block');
    
    if ( this.isMobile() ) {
      $('#header-navigation').hide();
      this.displayOnly('feed');
    } else {
      this.displayOnly('map_canvas feed');
      
      if( $('#map-wrap').css('top') == '250px' ) {
        this.scrollMap();
      }
    }

		var self = this;

    if(this.feedView.timestamp < new Date().getTime() - 60*60*12){
      this.feedItemCollection.fetch({
        success: function(){
          self.feedView.addFeedItemCollection(self.feedItemCollection);
          self.feedView.timestamp = new Date().getTime();
        },
        error: function(){
          console.error("Feed konnte nicht geladen werden!");
        },
        add: true
      });
    }
  },
  getUserLocation: function() {
    this.navigate("", {trigger: true});

    if ( this.isMobile() ) {
      this.displayOnly('map_canvas');
      $('#header-navigation').show();
    } else {
      this.displayOnly('map_canvas appinfo hand-phone');
    }
    
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

        if(eventtype)
          self.eventDispatcher.trigger(eventtype);
        else
          self.eventDispatcher.trigger('hideLoadingView');
        
      }, 
      function(error){
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("Sie haben den Zugriff auf die Position verweigert!");
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
    this.navigate("about", {trigger: true});
    
    if ( this.isMobile() ) {
      $('#header-navigation').hide();
      this.displayOnly('info');
    } else {
      this.displayOnly('map_canvas info');

      if( $('#map-wrap').css('top') == '250px' ) {
        this.scrollMap();
      }
    }
  },
  defaultRoute: function(){
  	console.log('no route for this URI!');
  },
  getLoadingView: function(){
    this.loadingView.show();
    var self = this;

    this.eventDispatcher.on('hideLoadingView', function() {
      self.loadingView.hide();
      self.eventDispatcher.off('hideLoadingView');  
    });
  },
  mainElements: new Array('address', 'map_canvas', 'map_pointer', 'map_pointer_text', 'feed', 'info', 'maptype', 'appinfo', 'hand-phone'),
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
  },
  isMobile: function() {
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  },
  slideArticleToRight: function() {
    $('#rss').animate({
      'margin-left': '-=888'
    }, 1800, function(){

    });
  },
  slideArticleToLeft: function() {
    $('#rss').animate({
      'margin-left': '+=888'
    }, 1800, function(){

    });
  }
});