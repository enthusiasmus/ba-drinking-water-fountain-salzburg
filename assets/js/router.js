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
      $('#search_close_button, #failure_close_button').click(function(){$('#address').hide();$('#failure').hide();});
      $('#activatemap').mousedown(function(){self.scrollMap();});
    }
  },
  init: function(){
    try{
      if(!(Backbone.history.start()))
        throw "Couldn't start backbone history!";
    }
    catch(e){}
    
    var self = this;
    this.markerCollection.fetch({
      success: function(){
        self.mapView.addMarkerCollection(self.markerCollection);
        self.mapView.placeMarkersToMap();
      },
      error: function(){
        self.showFailureMessage("Trinkbrunnen konnten nicht geladen werden!");
      },
      add: true
    });
  },
  index: function(){
    this.navigate("", {trigger: true});
    var currentCenter = this.mapView.map.getCenter();
    var self = this;
    
    $('#info').hide();
    //load latest feed
      this.feedItemCollection.fetch({
        success: function(){
          self.feedView.addFeedItemCollection(self.feedItemCollection);
          $('#feed').hide();
          self.feedView.timestamp = new Date().getTime();
          if(!self.canSlideArticle('left')){
            $('.prev').css('background-image', 'url(assets/img/links_disabled.png)');
            self.eventDispatcher.trigger('loadedFeed');
          }
        },
        error: function(){
          self.showFailureMessage("Feed konnte nicht geladen werden!");
        },
        add: true
      });

      this.eventDispatcher.on('loadedFeed', function(){
        var element = _.first(self.feedItemCollection.toArray());
        console.log(element);

        var completeDescription = element.get('description');
        var shortDescription = completeDescription.substring(0, 150);
        shortDescription += '...';

        $('#latest_feed').html('<article>' + '<h3 class="feed-title"><a href="' + 
        element.escape('link') + '">' + element.escape("title") + 
        '</a></h3>' + '<p class="latest-feed-date">' + element.escape("pubDate") + 
        '</p>' + element.get('image') +'<p class="latest-feed-content">'+ shortDescription + '</p>' + '<a href="' + element.escape('link') + 
        '" class="latest-feed-more">Mehr</a>' + '</article>');
        var feedImg = $('#latest_feed img');
        var imgScaleValue = feedImg.height() / 120;
        var imgWidth = feedImg.width() / imgScaleValue;
        console.log(imgWidth);
        $('#latest_feed img').css({'width':  imgWidth, 'height': 120});

        self.eventDispatcher.off('loadedFeed');
      });


    if ( this.isMobile() )
      this.displayOnly('map_canvas');
    else 
      this.displayOnly('map_canvas appinfo hand-phone');
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
      if(this.routes[Backbone.history.fragment] == 'showRssFeed'){
        $('#feed').show();
      }
      $('#appinfo, #info, #feed, #hand-phone').animate({
        opacity : 1
      }, 1000);

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
      }, 1000, function(){
        $('#feed').css('display', 'none');
      });
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
  routeToFountain: function(id){
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
      this.displayOnly('feed back');
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
          if(!self.canSlideArticle('left')){
            $('.prev').css('background-image', 'url(assets/img/links_disabled.png)');
          }
        },
        error: function(){
          self.showFailureMessage("Feed konnte nicht geladen werden!");
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
            self.showFailureMessage("Zugriff auf Position verweigert!");
            break;
          case error.POSITION_UNAVAILABLE: 
            self.showFailureMessage("Position konnte nicht ermittelt werden!");
            break;
          case error.TIMEOUT:
            self.showFailureMessage("Zeitüberschreitung beim Ermitteln der Position!");
            break;
          case error.UNKNOWN_ERROR: 
            self.showFailureMessage("Positionsbestimmung zur Zeit nicht möglich!");
            break;
          default:
            self.showFailureMessage("Fehler bei der Positionsbestimmung!");
            break;
        }
             
      },{enableHighAccuracy:true, timeout:5000, maximumAge:60000});
    }
    else{
      self.showFailureMessage("Ihr Browser unterstützt keine Positionsbestimmung!");
    }
  },
  showAbout: function(){
    this.navigate("about", {trigger: true});
    
    if ( this.isMobile() ){
      $('#header-navigation').hide();
      this.displayOnly('info back');
    } else {
      this.displayOnly('map_canvas info');

      if( $('#map-wrap').css('top') == '250px' ) {
        this.scrollMap();
      }
    }
  },
  defaultRoute: function(){
  },
  getLoadingView: function(){
    this.loadingView.show();
    var self = this;

    this.eventDispatcher.on('hideLoadingView', function() {
      self.loadingView.hide();
      self.eventDispatcher.off('hideLoadingView');  
    });
  },
  mainElements: new Array('address', 'map_canvas', 'map_pointer', 'map_pointer_text', 'feed', 'info', 'maptype', 'appinfo', 'hand-phone', 'back'),
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
    var self = this;   
    $('.next').attr('onclick', '');
    if(this.canSlideArticle('right')){
      $('#rss').animate({
        'margin-left': '-=888'
      }, 1800, function(){
        if(!self.canSlideArticle('right')){
          $('.next').css('background-image', 'url(assets/img/rechts_disabled.png)');
        }
        if(self.canSlideArticle('left')){
          $('.prev').css('background-image', 'url(assets/img/links.png)');
        }
        $('.next').attr('onclick', 'window.Trinkbrunnen.slideArticleToRight()');
      });
    }
    else{
      $('.next').attr('onclick', 'window.Trinkbrunnen.slideArticleToRight()');    
    }
  },
  slideArticleToLeft: function() {    
    var self = this;
    $('.prev').attr('onclick', '');
    if(this.canSlideArticle('left')){
      $('#rss').animate({
        'margin-left': '+=888'
      }, 1800, function(){
        if(!self.canSlideArticle('left')){
          $('.prev').css('background-image', 'url(assets/img/links_disabled.png)');
        }
        if(self.canSlideArticle('right')){
          $('.next').css('background-image', 'url(assets/img/rechts.png)');
        }
        $('.prev').attr('onclick', 'window.Trinkbrunnen.slideArticleToLeft()');
      });
    }
    else{
      $('.prev').attr('onclick', 'window.Trinkbrunnen.slideArticleToLeft()');
    }
  },
  canSlideArticle: function(direction){
    var currentMargin = $('#rss').css('margin-left');
    currentMargin = currentMargin.replace('px', '');

    if(direction == 'left'){
      if(currentMargin >= '0'){
        return false;
      }
      else{
        return true;
      }
    }
    else if(direction == 'right'){
      var sizeFeedItemCollection = this.feedItemCollection.size()
      var lastPageItems = sizeFeedItemCollection % 4;    
      var lastAllowedSlidePosition = ((sizeFeedItemCollection - lastPageItems)/4 * 888)*(-1);
      
      if(currentMargin <= lastAllowedSlidePosition){
        return false;
      }
      else{
        return true;
      }
    }
  },
  showFailureMessage: function(message){
    $('#failure_message').text(message);
    $('#failure').show();
    setTimeout(function(){$('#failure').fadeOut();}, 2000);
  }
});