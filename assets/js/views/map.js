var MapView = Backbone.View.extend({
  el: $("#map_canvas"),
  model: null,
  userLocation: null,
  initialize: function() {
  },
  render: function() {
    if (window.google === undefined) {
      return false;
    }

    this.mapCenter = new google.maps.LatLng(this.model.get('centerLatitude'), this.model.get('centerLongitude'));

    var mapOptions = {
      center: this.mapCenter,
      zoom: this.model.get('zoom'),
      keyboardShortcuts: false,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      streetViewControl: false,
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    if (!window.Trinkbrunnen.isMobile()) {
      mapOptions.mapTypeControl = true;
    } else if (this.isIpad()) {
      mapOptions.zoom = this.model.get('zoom') + 1;
    }

    this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    isInitialize = true;
    return true;
  },
  mapCenter: undefined,
  markerCollection: undefined,
  map: undefined,
  markerCluster: undefined,
  markerArray: [],
  userLocationMarker: undefined, //have to be null, for outside checking purpose
  userLocationPrecisionCircle: undefined,
  directionsDisplay: undefined,
  directionsService: undefined,
  isInitialize: false,
  lastUsedRoutePosition: null,
  isRequestingRoute: null,
  isIpad: function() {
    return (navigator.userAgent.match(/iPad/i) != null);
  },
  isMobile: function() {
    return (navigator.appVersion.indexOf("Mobile") > -1);
  },
  resizeMap: function() {
    if (this.map !== undefined) {
      google.maps.event.trigger(this.map, 'resize');
    }
  },
  setCurrentCenterNew: function() {
    if (this.map !== undefined) {
      this.map.setCenter(this.mapCenter);
    }
  },
  saveCurrentCenter: function() {
    if (this.map !== undefined) {
      this.mapCenter = this.map.getCenter();
    }
  },
  addMarkerCollection: function(markerCollection) {
    this.markerCollection = markerCollection;
  },
  placeMarkersToMap: function() {
    var self = this;
    var isVisible = false;
    var myOptions = new Object();
    this.infoBox = new Object();

    //TODO: refactore?!
    userLocationMarker = this.userLocationMarker;
    google.maps.Marker.prototype.content = "";

    _.each(this.markerCollection.toArray(), function(markerModel, index) {
      var icon = new google.maps.MarkerImage(markerModel.get('imageUrl'), new google.maps.Size(17, 40), new google.maps.Point(0, 0), new google.maps.Point(9, 40));
      var shadow = new google.maps.MarkerImage(markerModel.get('shadowUrl'), new google.maps.Size(49, 40), new google.maps.Point(0, 0), new google.maps.Point(25, 40));

      var description = markerModel.get('description').substring(0, 37);
      if (description.length >= 37) {
        description += ".";
      }

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),
        icon: icon,
        title: markerModel.get("description"),
        content: description,
        shadow: shadow,
        zIndex: 1
      });

      if (navigator.appVersion.indexOf('MSIE') > -1) {
        var infoBoxBackground = "url(assets/img/website/infobox-ie.png) no-repeat";
        var pixelOffset = new google.maps.Size(-150, -112);
      } else {
        var infoBoxBackground = "url(assets/img/sprite-map.png) no-repeat 0px 0px";
        var pixelOffset = new google.maps.Size(-161, -112);
      }

      infoBoxOptions = {
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: pixelOffset,
        zIndex: null,
        boxClass: "mapInfoBox",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false,
        boxStyle: {
          position: "relative",
          background: infoBoxBackground,
          filter: 'alpha(opacity=255)',
          width: "279px",
          height: "58px",
          padding: "8px 20px"
        }
      };
      self.infoBox = new InfoBox(infoBoxOptions);

      google.maps.event.addListener(marker, 'click', function() {
        if (self.infoBox)
          self.infoBox.close();

        var infoContent = '<p class="p_infobox_head">' + marker.content + '</p><p class="p_infobox_content">';

        if (self.userLocationMarker) {
          var distanceInformation = self.distanceCalculator(self.userLocationMarker.getPosition(), marker.getPosition());
          if (distanceInformation)
            infoContent += "Distanz: " + distanceInformation + "<br/>";
        }
        if (navigator.geolocation) {
          //TODO: template
          infoContent += '<a href="javascript:void(0)" onclick="window.Trinkbrunnen.Router.routeToFountain(' + index + ')" class="calculate-route" title="Route berechnen">Route berechnen</a></p>';
        }
        infoContent += '<div class="pointer"></div>';

        self.infoBox.setContent(infoContent);
        self.infoBox.open(self.map, marker);
        self.map.setCenter(marker.getPosition());
      });

      google.maps.event.addListener(marker, 'dblclick', function() {
        self.map.setZoom(16);
        self.map.setCenter(marker.getPosition());
      });

      self.markerArray.push(marker);
    });

    var markerClusterOptions = {
      gridSize: 45,
      styles: [{
        height: 44,
        url: 'assets/img/sprite-map.png',
        backgroundPosition: '-37px -68px',
        width: 45,
        textColor: 'white'
      }]
    };

    this.markerCluster = new MarkerClusterer(this.map, this.markerArray, markerClusterOptions);
    google.maps.event.addListener(this.markerCluster, 'clusterclick', function(cluster) {
      self.infoBox.close();
    });
    google.maps.event.addListener(this.map, 'click', function() {
      self.infoBox.close();
    });
  },
  toggleClusterSingled: function() {
    if (this.markerArray[0].getMap() == null && this.markerCluster.getMap() != null) {
      for (i in this.markerArray) {
        this.markerArray[i].setMap(this.map);
      }
      this.markerCluster.setMap(null);
    } else {
      for (i in this.markerArray) {
        this.markerArray[i].setMap(null);
      }
      this.markerCluster.setMap(this.map);
    }
  },
  readyMap: function() {
    if (this.map && google.maps) {
      return true;
    } else {
      return false;
    }
  },
  readyFountains: function() {
    if (this.readyMap() && this.markerCollection) {
      return true;
    } else {
      return false;
    }
  },
  readyForRoute: function() {
    if (this.fountainToRoute && this.readyFountains() && this.userLocationMarker) {
      return true;
    } else {
      return false;
    }
  },
  fountainToRoute: null,
  fountainToRouteId: null,
  setRouteType: function(type) {
    if (type == 'next') {
      this.fountainToRoute = 'next';
    } else if ( typeof type == "number") {
      this.fountainToRoute = type;
    }
  },
  distanceCalculator: function(userPosition, markerPosition) {
    if (userPosition && markerPosition) {
      var distanceUserLocationToMarker = google.maps.geometry.spherical.computeDistanceBetween(userPosition, markerPosition);
      var distanceInM = distanceUserLocationToMarker.toFixed(2);

      if (parseInt(distanceInM) < 1000) {
        return parseInt(distanceInM).toFixed(0) + " m";
      } else {
        return (distanceUserLocationToMarker / 1000).toFixed(2) + " km";
      }
    }
    return false;
  },
  removeMarkersFromMap: function() {
    this.markerCluster.clearMarkers();
  },
  createUserLocation: function() {
    var icon = new google.maps.MarkerImage(this.userLocation.get("imageUrl"), new google.maps.Size(this.userLocation.get("imageWidth"), this.userLocation.get("imageHeight")), new google.maps.Point(this.userLocation.get("imageActiveOriginX"), this.userLocation.get("imageActiveOriginX")), new google.maps.Point(this.userLocation.get("imageAnchorX"), this.userLocation.get("imageAnchorY")));

    this.userLocationMarker = new google.maps.Marker({
      map: this.map,
      icon: icon,
      title: this.userLocation.get("title"),
      position: new google.maps.LatLng(this.userLocation.get("latitude"), this.userLocation.get("longitude")),
      zIndex: 9999
    });
  },
  centerAndFitUserLocation: function() {
    if (this.userLocationMarker == null) {
      this.createUserLocation();
    }

    var latitude = this.userLocation.get("latitude");
    var longitude = this.userLocation.get("longitude");
    var centerPoint = new google.maps.LatLng(latitude, longitude);
    var userLocationCircle = new google.maps.Circle();
    userLocationCircle.setRadius(this.userLocation.get("precision"));
    userLocationCircle.setCenter(centerPoint);

    this.map.fitBounds(userLocationCircle.getBounds());
  },
  activateUserLocation: function() {
    var activeOriginX = this.userLocation.get("imageActiveOriginX");
    var activeOriginY = this.userLocation.get("imageActiveOriginY");
    var changeIcon = this.userLocationMarker.getIcon();
    changeIcon.origin.x = activeOriginX;
    changeIcon.origin.y = activeOriginY;
    this.userLocationMarker.setIcon(changeIcon);
  },
  deactivateUserLocation: function() {
    var inactiveOriginX = this.userLocation.get("imageInactiveOriginX");
    var inactiveOriginY = this.userLocation.get("imageInactiveOriginY");
    var changeIcon = this.userLocationMarker.getIcon();
    changeIcon.origin.x = inactiveOriginX;
    changeIcon.origin.y = inactiveOriginY;
    this.userLocationMarker.setIcon(changeIcon);
  },
  centerUserLocation: function() {
    if (this.userLocationMarker) {
      this.map.setCenter(this.userLocationMarker.getPosition());
    }
  },
  removeUserLocation: function() {
    if (this.userLocationMarker) {
      this.userLocationMarker.setMap(null);
      this.userLocationMarker = null;
    }
    if (this.userLocationPrecisionCircle) {
      this.userLocationPrecisionCircle.setMap(null);
      this.userLocationPrecisionCircle = null;
    }
  },
  updateUserLocation: function() {
    if (this.readyMap()) {
      if (this.userLocationMarker == null) {
        this.createUserLocation();
      }

      var latitude = this.userLocation.get("latitude");
      var longitude = this.userLocation.get("longitude");
      var centerPoint = new google.maps.LatLng(latitude, longitude);
      this.userLocationMarker.setPosition(centerPoint);
    }

    if (this.readyForRoute()) {
      var distance = 999;
      if (this.lastUsedPosition != null) {
        distance = google.maps.geometry.spherical.computeDistanceBetween(this.userLocationMarker.getPosition(), this.lastUsedPosition);
      }

      var isNewRoute = false;
      if (this.directionsDisplay != null && this.fountainToRoute != null) {
        if (this.directionsDisplay.fountain != this.fountainToRoute) {
          isNewRoute = true;
        }
      }

      if (isNewRoute) {
        this.closeInfobox();
      }

      if (distance > 12 || isNewRoute) {
        this.lastUsedPosition = this.userLocationMarker.getPosition();
        this.updateRoute();
      }
      //TODO: else trigger success:route?!
    }
  },
  hideRoute: function() {
    if (this.directionsDisplay) {
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }
  },
  centerRoute: function() {
    if (this.directionsDisplay) {
      this.map.fitBounds(this.directionsDisplay.getDirections().routes[0].bounds);
    }

  },
  closeInfobox: function() {
    if (this.infoBox) {
      this.infoBox.close();
    }
  },
  //TODO: Stop route when error happend and only restart on new click from user
  updateRoute: function(shouldCenterRoute) {
    if (this.readyForRoute()) {
      if ( typeof this.fountainToRoute == "number") {
        this.drawRouteUserLocationToPosition(this.markerCollection.at(this.fountainToRoute), shouldCenterRoute);
      }
      if ( typeof this.fountainToRoute == "string" && this.fountainToRoute == "next") {
        this.drawRouteUserLocationToPosition(this.nearestFountain(), shouldCenterRoute);
      }
    }
  },
  drawRouteUserLocationToPosition: function(marker, shouldCenterRoute) {
    var self = this;

    //Because we are already waiting for a response
    if (this.isRequestingRoute == true) {
      return;
    } else {
      this.isRequestingRoute = true;
    }

    var request = {
      origin: this.userLocationMarker.getPosition(),
      destination: new google.maps.LatLng(marker.get('latitude'), marker.get('longitude')),
      travelMode: google.maps.TravelMode.WALKING
    };

    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, function(result, status) {
      self.isRequestingRoute = false;

      if (status == google.maps.DirectionsStatus.OK) {
        self.hideRoute();

        self.directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: false,
          suppressMarkers: true,
          suppressInfoWindows: true,
          map: self.map,
          preserveViewport: true,
          fountain: self.fountainToRoute
        });

        self.directionsDisplay.setDirections(result);
        window.Trinkbrunnen.EventDispatcher.trigger("success:route");
      } else {
        //TODO: Stop routing here!?
        window.Trinkbrunnen.EventDispatcher.trigger("error:route", window.Trinkbrunnen.MessageHandler.messages.route.error);
      }
    });
  },
  nearestFountain: function(position) {
    var distanceToNextFontain = tempShortestDistance = idx = 0;
    var self = this;
    var actualLocation;

    if (position)
      actualLocation = position;
    else
      actualLocation = self.userLocationMarker.getPosition();

    _.each(self.markerCollection.toArray(), function(markerModel, index) {
      tempShortestDistance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")), actualLocation);

      if (distanceToNextFontain == 0 || distanceToNextFontain > tempShortestDistance) {
        distanceToNextFontain = tempShortestDistance;
        idx = index;
      }
    });
    return this.markerCollection.at(idx);
  }
});
