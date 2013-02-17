var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "feed": "showRssFeed",
    "lakes": "showLakes",
    "about": "showAbout",
    "maptype/:type": "changeMaptype",
    "*actions": "index"
  },
  initialize: function() {
  },
  init: function() {
    var self = this;
    window.Trinkbrunnen.Collections.marker.url = window.Trinkbrunnen.Urls.fountain;
    window.Trinkbrunnen.Collections.feedItem.url = window.Trinkbrunnen.Urls.feed;
    window.Trinkbrunnen.Views.map.model = window.Trinkbrunnen.Models.map;
    window.Trinkbrunnen.Views.address.mapView = window.Trinkbrunnen.Views.map;

    window.Trinkbrunnen.Views.map.userLocation = window.Trinkbrunnen.Models.userLocation;
    window.Trinkbrunnen.Views.map.listenTo(window.Trinkbrunnen.Models.userLocation, 'change:latitude change:longitude', window.Trinkbrunnen.Views.map.updateUserLocation);

    try {
      if (!(Backbone.history.start()))
        throw "Couldn't start backbone history!";
    } catch(e) {
    }

    if (window.Trinkbrunnen.isOnline()) {
      this.renderMapWithFountains();
    }

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
    } else {
      $("#header-navigation .menu-item").bind("touchstart", function() {
        $("#" + $(this).attr('id')).addClass("fake-active-" + $(this).attr('id'));
      }).bind("touchend", function() {
        $("#" + $(this).attr('id')).removeClass("fake-active-" + $(this).attr('id'));
      });
      
      $("#back").bind("touchstart", function() {
        $("#back").addClass("active-back");
      }).bind("touchend", function() {
        $("#back").removeClass("active-back");
      });

      $("#navigation .menu-item").bind("touchstart", function() {
        $("#" + $(this).attr('id') + " a").addClass("active-navigation-a");
        $("#" + $(this).attr('id') + " a span").addClass("active-" + $(this).attr('id'));
      }).bind("touchend", function() {
        $("#" + $(this).attr('id') + " a").removeClass("active-navigation-a");
        $("#" + $(this).attr('id') + " a span").removeClass("active-" + $(this).attr('id'));
      });
    }

    if (window.innerWidth >= 768) {
      $("#lakes ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
      $("#lakes ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
      $("#lakes ul li ul").css('width', '50%');
    } else {
      $("#lakes ul li:nth-child(2n+1) ul").css('background', '#E9E9E9');
    }

    $('#reload_map').click(function() {
      $('#script-google-map').remove();
      $('script[src*="google"]').remove();
      $('script[src*="gstatic"]').remove();
      $('script[src*="infobox"]').remove();

      //TODO: got inserted at the wrong place
      //TODO: later loading doesn't work: Error <map>
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "assets/js/libs/infobox.js";
      document.body.appendChild(script);

      //TODO: got inserted at the wrong place
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "script-google-map";
      script.src = "https://maps.google.com/maps/api/js?libraries=geometry&sensor=true&region=AT&callback=window.Trinkbrunnen.initializeMap";
      document.body.appendChild(script);
    });
  },
  renderMapWithFountains: function() {
    window.Trinkbrunnen.Views.map.render();
    window.Trinkbrunnen.Router.loadMarkersToMap();
  },
  loadMarkersToMap: function() {
    var self = this;
    window.Trinkbrunnen.Collections.marker.fetch({
      success: function() {
        window.Trinkbrunnen.Views.map.addMarkerCollection(window.Trinkbrunnen.Collections.marker);
        window.Trinkbrunnen.Views.map.placeMarkersToMap();
      },
      error: function() {
        if (self.isMobile()) {
          self.showFailureMessage(window.Trinkbrunnen.Messages.fountain.error.unloadable);
        } else {
          //TODO: Think about a failure message place, when map is not scrolled up
          //self.showFailureMessage(window.Trinkbrunnen.Messages.fountain.error.unloadable);
        }
      },
      add: true
    });
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

    var self = this;
    //get latest feeditem
    if (!this.isMobile()) {
      window.Trinkbrunnen.EventDispatcher.on('loadedFeed', function() {
        var element = _.first(window.Trinkbrunnen.Collections.feedItem.toArray());
        var template = _.template($("#template_article").html(), {
          pubDate: element.escape("pubDate"),
          link: element.escape("link"),
          title: element.escape("title")
        });
        $('#latest_feed').html(template);
        $('#latest_feed').show();

        window.Trinkbrunnen.EventDispatcher.off('loadedFeed');
      });

      if (window.Trinkbrunnen.Collections.feedItem.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
        window.Trinkbrunnen.Collections.feedItem.reset();
        window.Trinkbrunnen.Collections.feedItem.fetch({
          success: function() {
            window.Trinkbrunnen.Collections.feedItem.timestamp = new Date().getTime();
            window.Trinkbrunnen.EventDispatcher.trigger('loadedFeed');
            self.canSlideArticle('left');
          },
          error: function() {
            if (self.isMobile()) {
              self.showFailureMessage(window.Trinkbrunnen.Messages.feed.error.unloadable);
            } else {
              //TODO: Think about a failure message place, when map is not scrolled up
              //self.showFailureMessage(window.Trinkbrunnen.Messages.feed.error.unloadable);
            }
          },
          add: true
        });
      } else {
        window.Trinkbrunnen.EventDispatcher.trigger('loadedFeed');
      }
    }
  },
  scrollMap: function() {
    window.Trinkbrunnen.Views.map.saveCurrentCenter();

    if ($('#map-wrap').css('top') == '250px') {
      //scroll down
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
        window.Trinkbrunnen.Views.map.resizeMap();
        window.Trinkbrunnen.Views.map.setCurrentCenterNew();
      });

      if (this.routes[Backbone.history.fragment] == 'showRssFeed') {
        this.displayOnly('map_canvas map-wrap header-navigation feed');
      } else if (this.routes[Backbone.history.fragment] == 'showAbout') {
        this.displayOnly('map_canvas map-wrap header-navigation info');
      } else if (this.routes[Backbone.history.fragment] == 'showLakes') {
        this.displayOnly('map_canvas map-wrap header-navigation lakes');
      }

      $('#appinfo, #info, #feed, #left-hand-phone, #right-hand-phone, #lakes').animate({
        opacity: 1
      }, 1000);
    } else {
      //scroll up
      $('#map-wrap').animate({
        top: 250
      }, 1000, function() {
        $('#map-wrap').css('min-height', '294px');
        $('#navigation').show();
        $('#navigation, #address').animate({
          opacity: 1
        }, 500);
        window.Trinkbrunnen.Views.map.resizeMap();
        window.Trinkbrunnen.Views.map.setCurrentCenterNew();
        $('#activatemap').hide();
        $('#scroll').text('Karte verkleinern ↓');
      });
      $('#appinfo, #info, #feed, #left-hand-phone, #right-hand-phone, #lakes').animate({
        opacity: 0
      }, 1000, function() {
        $('#feed, #about, #lakes').css('display', 'none');
      });
    }
  },
  nextFountain: function() {
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

    this.getFountain('next');
  },
  routeToFountain: function(id) {
    this.getFountain(id);
  },
  getFountain: function(type) {
    $('#spin').fadeIn();

    //TODO: write it every where it is needed
    if (window.Trinkbrunnen.isOnline() == false) {
      this.showFailureMessage(window.Trinkbrunnen.Messages.state.offline);
      return;
    }

    if (window.Trinkbrunnen.Views.map.readyFountains() == false) {
      this.showFailureMessage(window.Trinkbrunnen.Messages.fountain.error.unloadable);
      return;
    }

    var self = this;

    if (this.isMobile()) {
      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && this.isWatchingID != null && window.Trinkbrunnen.Views.map.directionsDisplay != null && window.Trinkbrunnen.Views.map.fountainToRoute == type) {
        window.Trinkbrunnen.Views.map.centerRoute();
        $('#spin').hide();
        return;
      }
    } else {
      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && window.Trinkbrunnen.Views.map.directionsDisplay != null && window.Trinkbrunnen.Views.map.fountainToRoute == type) {
        window.Trinkbrunnen.Views.map.centerRoute();
        return;
      }
    }

    window.Trinkbrunnen.Views.map.setRouteType(type);
    if (this.isMobile()) {
      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && this.isWatchingID != null) {
        window.Trinkbrunnen.Views.map.updateUserLocation();
      } else {
        this.addEventListeners();
        //If position don't get watched, but userLocationMarker/-Position already exist
        //call position but place update Route and userLocationMarker anyway
        this.getPosition();

        if (window.Trinkbrunnen.Views.map.userLocationMarker != null) {
          window.Trinkbrunnen.Views.map.updateUserLocation();
        }
      }
    } else {
      window.Trinkbrunnen.Views.map.setRouteType(type);
      this.addEventListeners();
      this.getPosition();
    }
  },
  addEventListeners: function() {
    var self = this;
    window.Trinkbrunnen.EventDispatcher.on("success:userLocation", function() {
      //TODO: Set UserLocation, active image icon
      $('#spin').hide();
      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:userlocation");

      //Because only getPosition is used once instead of watchPosition permanently
      if (!self.isMobile()) {
        window.Trinkbrunnen.EventDispatcher.off(null, null, "permanent:userlocation");
      }
    }, "once:userlocation");

    window.Trinkbrunnen.EventDispatcher.on("error:userLocation", function(message) {
      //TODO: Set UserLocation, deactive image icon
      self.showFailureMessage(message);
      self.isWatchingID = null;

      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:userlocation");
      window.Trinkbrunnen.EventDispatcher.off(null, null, "permanent:userlocation");
    }, "permanent:userlocation");
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
  isWatchingID: null, //have to be null for inside checking
  blurAllElements: function() {
    document.activeElement.blur();
    $("input").blur();
  },
  showMaptype: function() {
    /*
     * TODO: Dispatch Event if offline then show Message
     *
     if(navigator.connection.type == CONNECTION.NONE){
     window.dispatchEvent("non connection");
     return false;
     }
     */

    console.log(this);
    this.navigate("", {
      trigger: true
    });

    this.displayOnly('map_canvas map-wrap header-navigation maptype');
  },
  changeMaptype: function(type) {
    if (this.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-navigation');
      window.Trinkbrunnen.Views.mapType.changeType(type);
    } else {
      this.index();
    }
  },
  showRssFeed: function() {
    /*
     * TODO: Dispatch Event if offline then show Message
     * when feeds are already catched show them
     *
     if(navigator.connection.type == CONNECTION.NONE){
     window.dispatchEvent("non connection");
     return false;
     }
     */

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
    //because for the newest feed item on pc the rss feed is already catched
    //and now we must only add it
    if (window.Trinkbrunnen.Collections.feedItem.size() > 0 && window.Trinkbrunnen.Collections.feedItem.timestamp > new Date().getTime() - 1000 * 60 * 60 * 12) {
      window.Trinkbrunnen.Views.feed.addFeedItemCollection(window.Trinkbrunnen.Collections.feedItem);
    } else if (window.Trinkbrunnen.Collections.feedItem.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
      window.Trinkbrunnen.Collections.feedItem.reset();
      window.Trinkbrunnen.Collections.feedItem.fetch({
        success: function() {
          window.Trinkbrunnen.Views.feed.addFeedItemCollection(window.Trinkbrunnen.Collections.feedItem);
          window.Trinkbrunnen.Collections.feedItem.timestamp = new Date().getTime();
          self.canSlideArticle('left');
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
    }
  },
  getUserLocation: function() {
    if (this.isMobile()) {
      this.navigate("", {
        trigger: true
      });
    }
    var self = this;
    $('#spin').fadeIn();

    if (this.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-navigation');

      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && this.isWatchingID != null) {
        window.Trinkbrunnen.Views.map.centerUserLocation();
        $('#spin').hide();
        return;
      }
    } else {
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');

      if (window.Trinkbrunnen.Views.map.userLocation != null) {
        window.Trinkbrunnen.Views.map.centerUserLocation();
        return;
      }
      //TODO: Check if EventDispatcher.off(); should be written here
    }

    this.addEventListeners();
    this.getPosition();
  },
  getPosition: function() {
    if (navigator.geolocation) {
      if (this.isMobile()) {
        if (this.isWatchingID == null) {
          this.isWatchingID = navigator.geolocation.watchPosition(this.getPositionSuccess, this.getPositionError, {
            enableHighAccuracy: true,
            timeout: 10000
          });
        }
      } else {
        navigator.geolocation.getCurrentPosition(this.getPositionSuccess, this.getPositionError, {
          enableHighAccuracy: true,
          timeout: 10000
        });
      }
    } else {
      window.Trinkbrunnen.EventDispatcher.trigger("error:userLocation", window.Trinkbrunnen.Messages.position.error.unsupported);
    }
  },
  getPositionError: function(error) {
    //FIXME: Firefox Bug "Not Now" doesn't lead to error callback
    var message = "";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = window.Trinkbrunnen.Messages.position.error.denied;
        break;
      case error.POSITION_UNAVAILABLE:
        message = window.Trinkbrunnen.Messages.position.error.unavailable;
        break;
      case error.TIMEOUT:
        message = window.Trinkbrunnen.Messages.position.error.timeout;
        break;
      case error.UNKNOWN_ERROR:
        message = window.Trinkbrunnen.Messages.position.error.unknown;
        break;
      default:
        message = window.Trinkbrunnen.Messages.position.error.standard;
        break;
    }

    window.Trinkbrunnen.EventDispatcher.trigger('error:userLocation', message);
  },
  getPositionSuccess: function(position) {
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

    window.Trinkbrunnen.Models.userLocation.set({
      latitude: lat,
      longitude: lng,
      time: time,
      precision: precision,
      altitude: altitude,
      altitudeAcc: altitudeAcc,
      speed: speed,
      heading: heading,
      timestampAttributes: new Date().getTime()
    });

    window.Trinkbrunnen.EventDispatcher.trigger('success:userLocation');
  },
  calculateGeoLocation: function(eventtype) {
    /**
     * Get GPS-/WLAN-Position - gets called:
     * 1. from getUserLocation - gets position and place marker and center
     * 2. from nextFountain - gets position, saves it at mapview and there draws route from position to next fontain
     * 3. from routeToFountain - gets position, saves it at mapview and there draws route from position to chosen fontain
     */

  },
  showLakes: function() {
    /*
     * TODO: Dispatch Event if offline then show Message
     * when infos are already catched show them
     *
     if(navigator.connection.type == CONNECTION.NONE){
     window.dispatchEvent("non connection");
     return false;
     }
     */

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

    if ($(window.Trinkbrunnen.Views.map.el).is(':visible') && window.Trinkbrunnen.Views.map.isInitialize && typeof window.google != 'undefined') {
      window.Trinkbrunnen.Views.map.resizeMap();
      window.Trinkbrunnen.Views.map.setCurrentCenterNew();
    }
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
    if (this.isMobile()) {
      return;
    }

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
      var sizeFeedItemCollection = window.Trinkbrunnen.Collections.feedItem.size();
      var lastPageItems = sizeFeedItemCollection % 4;
      var lastAllowedSlidePosition = (-1) * ((sizeFeedItemCollection - lastPageItems) / 4 * 888);

      if (lastPageItems == 0) {
        lastAllowedSlidePosition += 888;
      }

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
    if (message == "" || message == null) {
      return;
    }
    if (this.isMobile()) {
      $('#spin').hide();
    }

    $('#failure_message').text(message);
    $('#failure').show();
    setTimeout(function() {
      $('#failure').fadeOut();
    }, 3500);
  },
  toggleClusterSingled: function() {
    window.Trinkbrunnen.Views.map.toggleClusterSingled();
  }
});

