var MapView = Backbone.View.extend({
  el : $("#map_canvas"),
  initialize : function() {
    this.render();
  },
  render : function() {
    var myOptions = {
      center : new google.maps.LatLng(this.model.get('centerLatitude'), this.model.get('centerLongitude')),
      zoom : this.model.get('zoom'),
      keyboardShortcuts : false,
      mapTypeControl : false,
      panControl : false,
      rotateControl : false,
      streetViewControl : false,
      scaleControl : true,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };

    if(!this.isMobile()) {
      myOptions.mapTypeControl = true;
      myOptions.zoom = myOptions.zoom + 1;
    }

    this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var self = this;
    google.maps.event.addListener(this.map, 'tilesloaded', function() {
      //fire event, to remove loading view
    });
  },
  events : {
  },
  markerCollection : undefined,
  map : undefined,
  markerCluster : undefined,
  userLocationMarker : undefined,
  userLocationPrecisionCircle : undefined,
  directionsDisplay : undefined,
  directionsService : undefined,
  isMobile : function() {
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  },
  resizeMap : function() {
    google.maps.event.trigger(this.map, 'resize');
  },
  addMarkerCollection : function(markerCollection) {
    this.markerCollection = markerCollection;
  },
  placeMarkersToMap : function() {
    var markerArray = [];
    var self = this;
    var isVisible = false;
    var infoBox = new Object();
    var myOptions = new Object();
    userLocationMarker = this.userLocationMarker;
    google.maps.Marker.prototype.content = "";

    _.each(this.markerCollection.toArray(), function(markerModel) {
      var icon = new google.maps.MarkerImage(markerModel.get('imageUrl'),
          new google.maps.Size(17,40),
          new google.maps.Point(0,0),
          new google.maps.Point(9,40));
      var shadow = new google.maps.MarkerImage(markerModel.get('shadowUrl'),
          new google.maps.Size(49,40),
          new google.maps.Point(0,0),
          new google.maps.Point(25,40));

      var marker = new google.maps.Marker({
        position : new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
        icon : icon,
        title : markerModel.get("title"),
        content : markerModel.get('title'),
        shadow : shadow,
        zIndex : 1
      });
      
      infoBoxOptions = {
        disableAutoPan : false,
        maxWidth : 0,
        pixelOffset : new google.maps.Size(-161, -112),
        zIndex : null,
        boxClass : "mapInfoBox",
        closeBoxURL : "",
        infoBoxClearance : new google.maps.Size(1, 1),
        isHidden : false,
        pane : "floatPane",
        enableEventPropagation : false,
        boxStyle : {
          position: "relative",
          background : "url(assets/img/infobox.png) no-repeat",
          filter: 'alpha(opacity=255)',
          width : "279px",
          height: "58px",
          padding : "8px 20px"
        }
      };
      infoBox = new InfoBox(infoBoxOptions);

      google.maps.event.addListener(marker, 'click', function() {
        if(infoBox)
          infoBox.close();

        var infoContent = '<p class="p_infobox_head">' + marker.content + '</p><p class="p_infobox_content">';

        if(self.userLocationMarker) {
          var distanceInformation = self.distanceCalculator(self.userLocationMarker.getPosition(), marker.getPosition());
          if(distanceInformation)
            infoContent += "Distanz: " + distanceInformation + "<br/>";
        }
        infoContent += '<a href="javascript:void(0)" onclick="window.Trinkbrunnen.routeToFountain(' + markerModel.get("id") + ')" class="calculate-route" title="Route berechnen">Route berechnen</a></p>';
        infoContent += '<div class="pointer"></div>';

        infoBox.setContent(infoContent);
        infoBox.open(self.map, marker);
        self.map.setCenter(marker.getPosition());
      });

      google.maps.event.addListener(marker, 'dblclick', function() {
        self.map.setZoom(16);
        self.map.setCenter(marker.getPosition());
      });

      markerArray.push(marker);
    });
    var mcOptions = {
      styles : [{
        height : 52,
        url : 'assets/img/cluster.png',
        width : 53,
        textColor : 'white'
      }]
    };

    this.markerCluster = new MarkerClusterer(this.map, markerArray, mcOptions);
    google.maps.event.addListener(this.markerCluster, 'clusterclick', function(cluster) {
      infoBox.close();
    });
    google.maps.event.addListener(this.map, 'click', function() {
      infoBox.close();
    });
  },
  distanceCalculator : function(userPosition, markerPosition) {
    if(userPosition && markerPosition) {
      var distanceUserLocationToMarker = google.maps.geometry.spherical.computeDistanceBetween(userPosition, markerPosition);
      var distanceInM = distanceUserLocationToMarker.toFixed(2);

      if(parseInt(distanceInM) < 1000){
        return parseInt(distanceInM).toFixed(0) + " m";
      }
      else{
        return (distanceUserLocationToMarker / 1000).toFixed(2) + " km";
      }
    }
    return false;
  },
  removeMarkersFromMap : function() {
    this.markerCluster.clearMarkers();
  },
  placeUserLocation : function(markerModel) {
    //*** uncomment to display the precisioncircle ***//
    /*var userLocationPrecisionCircleOptions = {
      strokeColor : markerModel.get("precisionStrokeColor"),
      strokeOpacity : markerModel.get("precisionStrokeOpacity"),
      strokeWeight : markerModel.get("precisionStrokeWeight"),
      fillColor : markerModel.get("precisionFillColor"),
      fillOpacity : markerModel.get("precisionFillOpacity"),
      map : this.map,
      center : new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
      radius : markerModel.get("precision"),
      zIndex : 9999
    };
    this.userLocationPrecisionCircle = new google.maps.Circle(userLocationPrecisionCircleOptions);*/

    var icon = new google.maps.MarkerImage(markerModel.get("imageUrl"), new google.maps.Size(markerModel.get("imageWidth"), markerModel.get("imageHeight")), new google.maps.Point(markerModel.get("imageOriginX"), markerModel.get("imageOriginX")), new google.maps.Point(markerModel.get("imageAnchorX"), markerModel.get("imageAnchorY")));

    this.userLocationMarker = new google.maps.Marker({
      map : this.map,
      icon : icon,
      title : markerModel.get("title"),
      position : new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
      zIndex : 9999
    });
  },
  centerUserLocation : function(userLocationModel) {
    var latitude = userLocationModel.get("latitude");
    var longitude = userLocationModel.get("longitude");
    var centerPoint = new google.maps.LatLng(latitude, longitude);
    var userLocationCircle = new google.maps.Circle();
    userLocationCircle.setRadius(userLocationModel.get("precision"));
    userLocationCircle.setCenter(centerPoint);

    this.map.fitBounds(userLocationCircle.getBounds());
  },
  removeUserLocation : function() {
    if(this.userLocationMarker) {
      this.userLocationMarker.setMap(null);
      this.userLocationMarker = null;
    }
    if(this.userLocationPrecisionCircle) {
      this.userLocationPrecisionCircle.setMap(null);
      this.userLocationPrecisionCircle = null;
    }
  },
  hideRoute : function() {
    if(this.directionsDisplay) {
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }
  },
  drawRouteUserLocationToNextFountain : function() {
    if(!this.userLocationMarker) {
      console.log("Kein Startpunkt steht zur Verfügung!");
      return false;
    }
    this.hideRoute();

    var self = this;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable : false,
      suppressMarkers : true,
      suppressInfoWindows : true,
      map : self.map
    });

    var nearestMarker = this.nearestFountain();
    var request = {
      origin : this.userLocationMarker.getPosition(),
      destination : new google.maps.LatLng(nearestMarker.get('latitude'), nearestMarker.get('longitude')),
      travelMode : google.maps.TravelMode.WALKING
    };

    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, function(result, status) {
      if(status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(result);
      }
    });
  },
  nearestFountain : function(position) {
    var distanceToNextFontain = tempShortestDistance = id = 0;
    var self = this;
    var actualLocation;

    if(position)
      actualLocation = position;
    else
      actualLocation = self.userLocationMarker.getPosition();

    _.each(this.markerCollection.toArray(), function(markerModel) {
      tempShortestDistance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")), actualLocation);

      if(distanceToNextFontain == 0) {
        distanceToNextFontain = tempShortestDistance;
        id = markerModel.id;
      }

      if(distanceToNextFontain > tempShortestDistance) {
        distanceToNextFontain = tempShortestDistance;
        id = markerModel.id;
      }
    });
    return this.markerCollection.at(id);
  },
  drawRouteUserLocationToFountain : function(id) {
    this.hideRoute();

    var fontain = this.markerCollection.at(id);
    var self = this;

    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable : false,
      suppressMarkers : true,
      suppressInfoWindows : true,
      map : self.map
    });

    var request = {
      origin : this.userLocationMarker.getPosition(),
      destination : new google.maps.LatLng(fontain.get('latitude'), fontain.get('longitude')),
      travelMode : google.maps.TravelMode.WALKING
    };

    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, function(result, status) {
      if(status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(result);
      }
    });
  }
});
