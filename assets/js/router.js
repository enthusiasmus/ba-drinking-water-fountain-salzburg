var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "feed": "showRssFeed",
    "lakes": "showLakeTemperatures",
    "about": "showAbout",
    "maptype/:type": "changeMaptype",
    "*actions": "index"
  },
  initialize: function() {
    this.mapModel = new MapModel;
    this.feedModel = new FeedModel;
    this.userLocationModel = new UserLocationModel;
    this.markerCollection = new MarkerCollection;
    this.markerCollection.url = 'wis.php';
    this.feedItemCollection = new FeedItemCollection;
    this.feedItemCollection.url = 'rss.php';

    this.mapView = new MapView({
      model: this.mapModel
    });
    this.feedView = new FeedView;
    this.infoView = new InfoView;
    this.mapTypeView = new MapTypeView;
    this.addressView = new AddressView;

    this.addressView.mapView = this.mapView;
    this.mapTypeView.mapView = this.mapView;

    this.eventDispatcher = {};
    _.extend(this.eventDispatcher, Backbone.Events);
  },
  init: function() {
    try {
      if (!(Backbone.history.start()))
        throw "Couldn't start backbone history!";
    } catch(e) {
    }

    var self = this;
    this.markerCollection.fetch({
      success: function() {
        self.mapView.addMarkerCollection(self.markerCollection);
        self.mapView.placeMarkersToMap();
      },
      error: function() {
        if (self.isMobile()) {
          alert("Trinkbrunnen konnten nicht geladen werden!");
        } else {
          //TODO: Think about a failure message place, when map is not scrolled up
          //self.showFailureMessage("Trinkbrunnen konnten nicht geladen werden!");
        }
      },
      add: true
    });

    if (!this.isMobile()) {
      var self = this;
      $('#search_close_button, #failure_close_button').click(function() {
        $('#address').hide();
        $('#failure').hide();
      });
      $('#activatemap').mousedown(function() {
        self.scrollMap();
      });
      //because set/get of node attribute onclick is for ie a problem
      $('#prev').click(function() {
        self.slideArticleToLeft();
      });
      $('#next').click(function() {
        self.slideArticleToRight();
      })
      //color the lake temperatues 1,2,5,6,9,10,etc.
      $("#lakes ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
      $("#lakes ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
    } else {
      $(".menu-item").click(function(event) {
        var self = this;
        switch($(this).attr('id')) {
          case 'navi-position':
            $('#navi-position > a > span').addClass('navigation-position-a-active-span');
            $('#navi-position > a').addClass('navigation-a-active');
            setTimeout(function() {
              $('#navi-position > a').removeClass('navigation-a-active');
              $('#navi-position > a > span').removeClass('navigation-position-a-active-span');
            }, 500);
            break;
          case 'navi-fontain':
            $('#navi-fontain > a > span').addClass('navigation-fontain-a-active-span');
            $('#navi-fontain > a').addClass('navigation-a-active');
            setTimeout(function() {
              $('#navi-fontain > a').removeClass('navigation-a-active');
              $('#navi-fontain > a > span').removeClass('navigation-fontain-a-active-span');
            }, 500);
            break;
          case 'navi-maptype':
            $('#navi-maptype > a > span').addClass('navigation-maptype-a-active-span');
            $('#navi-maptype > a').addClass('navigation-a-active');
            setTimeout(function() {
              $('#navi-maptype > a').removeClass('navigation-a-active');
              $('#navi-maptype > a > span').removeClass('navigation-maptype-a-active-span');
            }, 350);
            break;
          case 'navi-feed':
            $('#navi-feed > a > span').addClass('navigation-feed-a-active-span');
            $('#navi-feed > a').addClass('navigation-a-active');
            setTimeout(function() {
              $('#navi-feed > a').removeClass('navigation-a-active');
              $('#navi-feed > a > span').removeClass('navigation-feed-a-active-span');
            }, 350);
            break;
          case 'navi-address':
            $('#navi-address > a > span').addClass('navigation-address-a-active-span');
            $('#navi-address > a').addClass('navigation-a-active');
            setTimeout(function() {
              $('#navi-address > a').removeClass('navigation-a-active');
              $('#navi-address > a > span').removeClass('navigation-address-a-active-span');
            }, 500);
            break;
          default:
            break;
        }
      });

      if(window.innerWidth >= 768){
        $("#lakes ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
        $("#lakes ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
      }
      else{
        $("#lakes ul li:nth-child(2n+1) ul").css('background', '#E9E9E9');
      }
    }
  },
  index: function() {
    this.navigate("", {
      trigger: true
    });

    if (this.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-navigation');
    } else {
      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');
    }
    this.mapView.map.setCenter(this.mapView.mapCenter);

    var self = this;
    //get latest feeditem
    if (!this.isMobile()) {
      this.eventDispatcher.on('loadedFeed', function() {
        var element = _.first(self.feedItemCollection.toArray());
        var template = _.template($("#template_article").html(), {
          pubDate: element.escape("pubDate"),
          link: element.escape("link"),
          title: element.escape("title")
        });
        $('#latest_feed').html(template);
        $('#latest_feed').show();

        self.eventDispatcher.off('loadedFeed');
      });
      if (this.feedItemCollection.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
        this.feedItemCollection.reset();
        this.feedItemCollection.fetch({
          success: function() {
            self.feedItemCollection.timestamp = new Date().getTime();
            self.eventDispatcher.trigger('loadedFeed');
          },
          error: function() {
            if (self.isMobile()) {
              alert("Feed konnte nicht geladen werden!");
            } else {
              //TODO: Think about a failure message place, when map is not scrolled up
              //self.showFailureMessage("Feed konnte nicht geladen werden!");
            }
          },
          add: true
        });
      } else {
        self.eventDispatcher.trigger('loadedFeed');
      }
    }
  },
  scrollMap: function() {
    this.mapView.mapCenter = this.mapView.map.getCenter();

    if ($('#map-wrap').css('top') == '250px') {
      $('#map-wrap').css('min-height', '0px');

      $('#navigation, #address').animate({
        opacity: 0
      }, 500, function() {
        $('#navigation, #address').hide();
      });

      $('#map-wrap').animate({
        top: 544
      }, 1000, function() {
        $('#activatemap').show();
        $('#scroll').text('Karte vergrößern ↑');
        window.Trinkbrunnen.mapView.resizeMap();
        window.Trinkbrunnen.mapView.map.setCenter(window.Trinkbrunnen.mapView.mapCenter);
      });

      if (this.routes[Backbone.history.fragment] == 'showRssFeed') {
        this.displayOnly('map_canvas map-wrap header-navigation feed');
      } else if (this.routes[Backbone.history.fragment] == 'showAbout') {
        this.displayOnly('map_canvas map-wrap header-navigation info');
      }

      $('#appinfo, #info, #feed, #left-hand-phone, #right-hand-phone').animate({
        opacity: 1
      }, 1000);

    } else {
      $('#map-wrap').animate({
        top: 250
      }, 1000, function() {
        $('#map-wrap').css('min-height', '294px');
        $('#navigation').show();
        $('#navigation, #address').animate({
          opacity: 1
        }, 500);
        window.Trinkbrunnen.mapView.resizeMap();
        window.Trinkbrunnen.mapView.map.setCenter(window.Trinkbrunnen.mapView.mapCenter);
        $('#activatemap').hide();
        $('#scroll').text('Karte verkleinern ↓');
      });
      $('#appinfo, #info, #feed, #left-hand-phone, #right-hand-phone').animate({
        opacity: 0
      }, 1000, function() {
        $('#feed').css('display', 'none');
      });
    }
  },
  nextFountain: function() {
    this.calculateGeoLocation('drawRoute');

    if (this.isMobile()) {
      this.navigate("", {
        trigger: true
      });
    }

    if (this.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-navigation');
    } else {
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');
    }

    var self = this;
    this.eventDispatcher.on('drawRoute', function() {
      /**
       * TODO: check if drawRouteUserLocation ToFountain and to ToNextFountain can gets simplyfied
       */
      self.mapView.drawRouteUserLocationToNextFountain();
      self.eventDispatcher.off('drawRoute');
      if (self.mapView.infoBox) {
        self.mapView.infoBox.close();
      }
    });
  },
  routeToFountain: function(id) {
    this.calculateGeoLocation('drawRouteTo');

    var self = this;
    this.eventDispatcher.on('drawRouteTo', function() {
      /**
       * TODO: check if drawRouteUserLocation ToFountain and to ToNextFountain can gets simplyfied
       */
      self.mapView.drawRouteUserLocationToFountain(id);
      self.eventDispatcher.off('drawRouteTo');
      if (self.mapView.infoBox) {
        self.mapView.infoBox.close();
      }
    });
  },
  showAddressSearch: function() {
    if (this.isMobile()) {
      this.navigate("", {
        trigger: true
      });
    }

    if (this.isMobile()) {
      $('input[name=address]').blur(function() {
        $('#address').hide();
      });
      this.displayOnly('map_canvas map-wrap header-navigation address');
      $('input[name=address]').focus().select();
    } else {
      this.displayOnly('map_canvas map-wrap address appinfo left-hand-phone right-hand-phone header-navigation');
      $('input[name=address]').focus().select();
    }
  },
  blurAllElements: function() {
    document.activeElement.blur();
    $("input").blur();
  },
  showMaptype: function() {
    this.navigate("", {
      trigger: true
    });

    this.displayOnly('map_canvas map-wrap header-navigation maptype');
  },
  changeMaptype: function(type) {
    if (this.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-navigation');
      this.mapTypeView.changeType(type);
    } else {
      this.index();
    }
  },
  showRssFeed: function() {
    this.mapView.mapCenter = this.mapView.map.getCenter();
    this.navigate("feed", {
      trigger: true
    });

    if (this.isMobile()) {
      this.displayOnly('feed back overlay');
    } else {
      this.displayOnly('map_canvas map-wrap feed header-navigation');

      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
    }

    var self = this;
    if (this.feedItemCollection.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
      this.feedItemCollection.reset();
      this.feedItemCollection.fetch({
        success: function() {
          self.feedView.addFeedItemCollection(self.feedItemCollection);
          self.feedView.timestamp = new Date().getTime();
          self.feedItemCollection.timestamp = new Date().getTime();

          if (!self.isMobile()) {
            self.canSlideArticle('left')
          }
        },
        error: function() {
          if (self.isMobile()) {
            alert("Feed konnte nicht geladen werden!");
          } else {
            self.showFailureMessage("Feed konnte nicht geladen werden!");
          }
        },
        add: true
      });
    } else {
      if (!this.isMobile() && this.feedView.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
        self.feedView.addFeedItemCollection(self.feedItemCollection);
        self.feedView.timestamp = new Date().getTime();
        self.canSlideArticle('left')
      }
    }
  },
  getUserLocation: function() {
    if (this.isMobile()) {
      this.navigate("", {
        trigger: true
      });
    }

    if (this.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-navigation');
    } else {
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');
    }

    this.calculateGeoLocation();
  },
  calculateGeoLocation: function(eventtype) {
    /**
     * Get GPS-/WLAN-Position - gets called:
     * 1. from getUserLocation - gets position and place marker and center
     * 2. from nextFountain - gets position, saves it at mapview and there draws route from position to next fontain
     * 3. from routeToFountain - gets position, saves it at mapview and there draws route from position to chosen fontain
     */

    var self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var time = position.timestamp;
        var lat = position.coords.latitude;
        //decimal degree
        var lng = position.coords.longitude;
        //decimal degree
        var precision = position.coords.accuracy;
        //meter
        var altitude = position.coords.altitude;
        //meter
        var altitudeAcc = position.coords.altitudeAccuracy;
        //meter
        var speed = position.coords.speed;
        //meter per second
        var heading = position.coords.heading;
        //degree from true north

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

        if (eventtype)
          self.eventDispatcher.trigger(eventtype);
        else
          self.eventDispatcher.trigger('hideLoadingView');

      }, function(error) {
        var message = 'Fehler bei der Positionsbestimmung!';

        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = "Zugriff auf Position verweigert!";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Position konnte nicht ermittelt werden!";
            break;
          case error.TIMEOUT:
            message = "Zeitüberschreitung beim Ermitteln der Position!";
            break;
          case error.UNKNOWN_ERROR:
            message = "Positionsbestimmung zur Zeit nicht möglich!";
            break;
          default:
            message = "Fehler bei der Positionsbestimmung!";
            break;
        }

        if (self.isMobile()) {
          alert(message);
        } else {
          self.showFailureMessage(message);
        }
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000
      });
    } else {
      if (self.isMobile()) {
        alert("Ihr Browser unterstützt keine Positionsbestimmung!");
      } else {
        self.showFailureMessage("Ihr Browser unterstützt keine Positionsbestimmung!");
      }
    }
  },
  showLakeTemperatures: function() {
    this.mapView.mapCenter = this.mapView.map.getCenter();
    this.navigate("lakes", {
      trigger: true
    });

    if (this.isMobile()) {
      this.displayOnly('lakes back overlay');
    } else {
      this.displayOnly('map_canvas map-wrap lakes header-navigation');

      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
    }
  },
  showAbout: function() {
    this.mapView.mapCenter = this.mapView.map.getCenter();
    this.navigate("about", {
      trigger: true
    });

    if (this.isMobile()) {
      this.displayOnly('info back overlay');
    } else {
      this.displayOnly('map_canvas map-wrap info header-navigation');

      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
    }
  },
  mainElements: new Array('address', 'map_canvas', 'map_pointer', 'map_pointer_text', 'feed', 'info', 'maptype', 'appinfo', 'left-hand-phone', 'right-hand-phone', 'back', 'failure', 'header-navigation', 'overlay', 'map-wrap', 'lakes'),
  displayOnly: function(elementsToShow) {
    var elementsArray = elementsToShow.split(" ");
    var shouldShow;

    for (idx in this.mainElements) {
      shouldShow = false;
      for (i in elementsArray) {
        if (elementsArray[i] == this.mainElements[idx]) {
          shouldShow = true;
          break;
        }
      }

      if (shouldShow)
        $('#' + this.mainElements[idx]).show();
      else
        $('#' + this.mainElements[idx]).hide();
    }

    if ($('#map_canvas').is(':visible'))
      google.maps.event.trigger(this.mapView.map, "resize");
  },
  isMobile: function() {
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  },
  slideArticleToRight: function() {
    var self = this;
    $('#next').off('click');

    if (this.canSlideArticle('right')) {
      $('#rss').animate({
        'margin-left': '-=888'
      }, 1800, function() {
        self.canSlideArticle('right');
        self.canSlideArticle('left');
        $('#next').on('click', function() {
          self.slideArticleToRight();
        });
      });
    } else {
      $('#next').on('click', function() {
        self.slideArticleToRight();
      });
    }
  },
  slideArticleToLeft: function() {
    var self = this;
    $('#prev').off('click');

    if (this.canSlideArticle('left')) {
      $('#rss').animate({
        'margin-left': '+=888'
      }, 1800, function() {
        self.canSlideArticle('left');
        self.canSlideArticle('right');
        $('#prev').on('click', function() {
          self.slideArticleToLeft();
        });
      });
    } else {
      $('#prev').on('click', function() {
        self.slideArticleToLeft();
      });
    }
  },
  canSlideArticle: function(direction) {
    var currentMargin = $('#rss').css('margin-left');
    currentMargin = currentMargin.replace('px', '');

    if (direction == 'left') {
      if (currentMargin >= '0') {
        $('#prev').toggleClass('prev_disabled', true);
        return false;
      } else {
        $('#prev').toggleClass('prev_disabled', false);
        return true;
      }
    } else if (direction == 'right') {
      var sizeFeedItemCollection = this.feedItemCollection.size()
      var lastPageItems = sizeFeedItemCollection % 4;
      var lastAllowedSlidePosition = ((sizeFeedItemCollection - lastPageItems) / 4 * 888) * (-1);

      if (currentMargin <= lastAllowedSlidePosition) {
        $('#next').toggleClass('next_disabled', true);
        return false;
      } else {
        $('#next').toggleClass('next_disabled', false);
        return true;
      }
    }
  },
  showFailureMessage: function(message) {
    $('#failure_message').text(message);
    $('#failure').show();
    setTimeout(function() {
      $('#failure').fadeOut();
    }, 3500);
  },
  toggleClusterSingled: function() {
    this.mapView.toggleClusterSingled();
  }
});
