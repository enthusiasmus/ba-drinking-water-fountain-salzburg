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
    
    var self = this;
    google.maps.event.addListener(this.map, 'tilesloaded', function(){
      self.dispatchLoadingFinished();
    }); 
    
    var template = _.template( $('#map_template').html() );
    $(this.el).html(template);
  },
  events: {
  },
  dispatchLoadingFinished: function(){
    var event = document.createEvent('Event');
    event.initEvent('loadingFinish', true, true)
    document.dispatchEvent(event);
  },
  markerCollection: undefined,
  map: undefined,
  markerCluster: undefined,
  userLocationMarker: undefined,
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
        
        if(self.userLocationMarker){
          var distanceInformation = self.distanceCalculator(self.userLocationMarker.getPosition(), marker.getPosition());
          if(distanceInformation)
            infoContent += "<br>Distanz: " + distanceInformation;
        }

        infoContent += '<br/><br/><a href="#" class="detail_route_link">Route berechnen</a>';

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
  distanceCalculator: function(userPosition, markerPosition){
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
  placeUserLocation: function(markerModel){
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
  removeUserLocation: function(){
    if(this.userLocationMarker){
      this.userLocationMarker.setMap(null);
      this.userLocationMarker = null;
    }
    if(this.userLocationPrecisionCircle){
      this.userLocationPrecisionCircle.setMap(null);
      this.userLocationPrecisionCircle = null;
    }
  },
  drawRouteUserLocationToNextFountain: function(){
    if(!this.userLocationMarker){
      console.log("Kein Startpunkt steht zur Verfügung!");
      return false;
    }

    if(this.directionsDisplay)
      this.directionsDisplay.setMap(null);

    var self = this;
    self.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false,
      suppressMarkers: true,
      suppressInfoWindows: true,
      map: self.map 
    });

    var request = {
      origin: this.userLocationMarker.getPosition(),
      destination: this.nearestFountain(),
      travelMode: google.maps.TravelMode.WALKING
    };

    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(result);
      }
      self.dispatchLoadingFinished();
    });
  },
  nearestFountain: function(){
    var distanceToNextFontain = tempShortestDistance = 0;
    var nearestFountain = new google.maps.Marker();
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
        nearestFountain.setPosition(new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")));
      }
    });
    
    return nearestFountain.getPosition();
  }
});