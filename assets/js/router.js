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
  isFetchingLakes: false,
  init: function() {
    var self = this;
    window.Trinkbrunnen.Collections.markers.url = window.Trinkbrunnen.Urls.fountains;
    window.Trinkbrunnen.Collections.lakes.url = window.Trinkbrunnen.Urls.lakes;
    window.Trinkbrunnen.Collections.feedItems.url = window.Trinkbrunnen.Urls.feed;
    window.Trinkbrunnen.Views.map.model = window.Trinkbrunnen.Models.map;
    window.Trinkbrunnen.Views.address.mapView = window.Trinkbrunnen.Views.map;

    window.Trinkbrunnen.Views.map.userLocation = window.Trinkbrunnen.Models.userLocation;
    window.Trinkbrunnen.Views.map.listenTo(window.Trinkbrunnen.Models.userLocation, 'change:latitude change:longitude', window.Trinkbrunnen.Views.map.updateUserLocation);

    try {
      if (!(Backbone.history.start()))
        throw "Couldn't start backbone history!";
    } catch(e) {
    }

    if (window.Trinkbrunnen.isMobile() && window.google === undefined) {
      this.displayOnly('map_canvas map-wrap header-navigation reloading_map');
    } else {
      this.renderMapWithFountains();
    }

    if (!window.Trinkbrunnen.isMobile()) {
      var self = this;
      $('#search_close_button, #failure_close_button').click(function() {
        $('#address').hide();
        $('#failure').hide();
        //TODO: When closing failure, the next message don't show immediately
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

      $('#reloading_map .reload_button').click(function() {
        $('#script-google-map').remove();
        $('#script-google-infobox').remove();
        $('script[src*="infobox"]').remove();
        $('script[src*="google"]').remove();
        $('script[src*="gstatic"]').remove();
        $('script[src*="infobox"]').remove();

        //TODO: got inserted at the wrong place
        //TODO: later loading doesn't work: Error <map>

        //TODO: got inserted at the wrong place
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "script-google-map";
        script.src = "https://maps.google.com/maps/api/js?libraries=geometry&sensor=true&region=AT&callback=window.Trinkbrunnen.Router.reloadingMapsLibrary";
        document.body.appendChild(script);
      });
      $('#reloading_lakes .reload_button').click(function() {
        window.Trinkbrunnen.Router.showLakes();
      });
      $('#reloading_feed .reload_button').click(function() {
        window.Trinkbrunnen.Router.showRssFeed();
      });
      $('#reloading_fountains .reload_button').click(function() {
        window.Trinkbrunnen.Router.loadMarkersToMap();
      });
      $('input[name=address]').blur(function() {
        $('#address').hide();
        $('#header-maptype').css('top', '50px');
      });
    }
  },
  reloadingMapsLibrary: function() {
    var script = document.createElement("script");
    script.id = "script-google-infobox";
    script.type = "text/javascript";
    script.src = "assets/js/libs/infobox.js";
    document.body.appendChild(script);
    setTimeout(function() {
      window.Trinkbrunnen.Router.renderMapWithFountains();
    }, 200);
    //TODO: 200 ms are enough?
  },
  renderMapWithFountains: function() {
    if (window.Trinkbrunnen.isMobile()) {
      $('#header-maptype').show();
      if (window.Trinkbrunnen.Views.map.isInitialize === true) {
        window.Trinkbrunnen.Router.loadMarkersToMap();
      } else if (window.Trinkbrunnen.Views.map.render() === true) {
        window.Trinkbrunnen.Router.loadMarkersToMap();
      } else {
        $('#reloading_map').show();
      }
    } else {
      window.Trinkbrunnen.Views.map.render();
      window.Trinkbrunnen.Router.loadMarkersToMap();
    }
  },
  downloadGraphic: function(area) {
    var filename = "";
    if (area == "north") {
      filename = "APP_KiBasicGrafikenAPP_Vorlandseen.png";
    } else if (area == "south") {
      filename = "APP_KiBasicGrafikenAPP_Berglandseen.png";
    } else {
      return;
    }

    if (window.Trinkbrunnen.isNative === true) {
      //TODO
    } else {
      window.open(window.Trinkbrunnen.Urls.graphics + '?area=' + area, 'download', 'status=0');
    }
  },
  loadMarkersToMap: function() {
    var self = this;
    window.Trinkbrunnen.Collections.markers.fetch({
      success: function() {
        $('#reloading_fountains').hide();
        window.Trinkbrunnen.Views.map.addMarkerCollection(window.Trinkbrunnen.Collections.markers);
        window.Trinkbrunnen.Views.map.placeMarkersToMap();
      },
      error: function() {
        if (window.Trinkbrunnen.isMobile()) {
          $('#reloading_fountains').show();
        } else {
          //TODO: Think about a failure message place, when map is not scrolled up
          //window.Trinkbrunnen.MessageHandler.addMessage(window.Trinkbrunnen.MessageHandler.messages.fountain.error.unloadable);
        }
      },
      add: true
    });
  },
  index: function() {
    this.navigate("", {
      trigger: false,
      replace: false
    });

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-maptype header-navigation');

      if (window.google === undefined) {
        this.displayOnly('map_canvas map-wrap header-navigation reloading_map');
        return;
      }
    } else {
      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');
    }

    var self = this;
    //get latest feeditem
    if (!window.Trinkbrunnen.isMobile()) {
      window.Trinkbrunnen.EventDispatcher.on('loadedFeed', function() {
        var element = _.first(window.Trinkbrunnen.Collections.feedItems.toArray());
        var template = _.template($("#template_article").html(), {
          pubDate: element.escape("pubDate"),
          link: element.escape("link"),
          title: element.escape("title")
        });
        $('#latest_feed').html(template);
        $('#latest_feed').show();

        window.Trinkbrunnen.EventDispatcher.off('loadedFeed');
      });

      if (window.Trinkbrunnen.Collections.feedItems.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
        window.Trinkbrunnen.Collections.feedItems.reset();
        window.Trinkbrunnen.Collections.feedItems.fetch({
          success: function() {
            window.Trinkbrunnen.Collections.feedItems.timestamp = new Date().getTime();
            window.Trinkbrunnen.EventDispatcher.trigger('loadedFeed');
            self.canSlideArticle('left');
          },
          error: function() {
            if (!window.Trinkbrunnen.isMobile()) {
              //TODO: Think about a failure message place, when map is not scrolled up
              //window.Trinkbrunnen.MessageHandler.addMessage(window.Trinkbrunnen.MessageHandler.messages.feed.error.unloadable);
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
    if (window.Trinkbrunnen.isMobile()) {
      this.navigate("", {
        trigger: false,
        replace: false
      });
    }

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-maptype header-navigation');

      if (window.google === undefined) {
        this.displayOnly('map_canvas map-wrap header-navigation reloading_map');
        return;
      }
    } else {
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');
    }

    this.getFountain('next');
  },
  routeToFountain: function(id) {
    window.Trinkbrunnen.Views.map.closeInfobox();
    this.getFountain(id);
    //TODO: Check for desktop pcs
  },
  getFountain: function(type) {
    //TODO: write it every where it is needed
    if (window.Trinkbrunnen.isOnline() === false) {
      window.Trinkbrunnen.MessageHandler.addMessage(window.Trinkbrunnen.MessageHandler.messages.state.offline);
      return;
    }

    if (window.Trinkbrunnen.Views.map.readyFountains() == false) {
      $('#reloading_fountains').show();
      return;
    }

    var self = this;

    if (window.Trinkbrunnen.isMobile()) {
      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && this.isWatchingID != null && window.Trinkbrunnen.Views.map.directionsDisplay != null && window.Trinkbrunnen.Views.map.fountainToRoute == type) {
        window.Trinkbrunnen.Views.map.centerRoute();
        return;
      }
    } else {
      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && window.Trinkbrunnen.Views.map.directionsDisplay != null && window.Trinkbrunnen.Views.map.fountainToRoute == type) {
        window.Trinkbrunnen.Views.map.centerRoute();
        return;
      }
    }
    window.Trinkbrunnen.Views.map.setRouteType(type);
    if (window.Trinkbrunnen.isMobile()) {
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

    //at button click center the route by success
    window.Trinkbrunnen.EventDispatcher.on("success:route", function() {
      window.Trinkbrunnen.Views.map.centerRoute();
      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:route:click");
    }, "once:route:click");

    window.Trinkbrunnen.EventDispatcher.on("error:route", function(message) {
      window.Trinkbrunnen.MessageHandler.addMessage(message);
      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:route:click");
    }, "once:route:click");
  },
  addEventListeners: function() {
    var self = this;
    window.Trinkbrunnen.EventDispatcher.on("success:userLocation", function() {
      window.Trinkbrunnen.Views.map.activateUserLocation();
      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:userlocation");

      //Because only getPosition is used once instead of watchPosition permanently
      if (!window.Trinkbrunnen.isMobile()) {
        window.Trinkbrunnen.EventDispatcher.off(null, null, "permanent:userlocation");
      }
    }, "once:userlocation");

    window.Trinkbrunnen.EventDispatcher.on("error:userLocation", function(message) {
      window.Trinkbrunnen.Views.map.deactivateUserLocation();
      window.Trinkbrunnen.MessageHandler.addMessage(message);
      self.isWatchingID = null;

      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:userlocation");
      window.Trinkbrunnen.EventDispatcher.off(null, null, "permanent:userlocation");
    }, "permanent:userlocation");
  },
  showAddressSearch: function() {
    if (window.Trinkbrunnen.isMobile()) {
      this.navigate("", {
        trigger: false,
        replace: false
      });
    }

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-maptype header-navigation address');

      if (window.google === undefined) {
        this.displayOnly('map_canvas map-wrap header-navigation reloading_map');
        return;
      }

      if (window.Trinkbrunnen.isOnline() === false) {
        window.Trinkbrunnen.MessageHandler.addMessage(window.Trinkbrunnen.MessageHandler.messages.state.offline);
        return;
      }
      $('#header-maptype').css('top', '94px');
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
    this.navigate("", {
      trigger: false,
      replace: false
    });

    this.displayOnly('map_canvas map-wrap header-maptype header-navigation maptype');
  },
  changeMaptype: function(type) {
    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-maptype header-navigation');
      window.Trinkbrunnen.Views.mapType.changeType(type);
    } else {
      this.index();
    }
  },
  showRssFeed: function() {
    this.navigate("feed", {
      trigger: false,
      replace: false
    });

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('feed back');
    } else {
      this.displayOnly('map_canvas map-wrap feed header-maptype');

      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
    }

    var self = this;
    //because for the newest feed item on pc the rss feed is already catched
    //and now we must only add it
    if (window.Trinkbrunnen.Collections.feedItems.size() > 0 && window.Trinkbrunnen.Collections.feedItems.timestamp > new Date().getTime() - 1000 * 60 * 60 * 12) {
      window.Trinkbrunnen.Views.feed.addFeedItemCollection(window.Trinkbrunnen.Collections.feedItems);
    } else if (window.Trinkbrunnen.Collections.feedItems.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
      window.Trinkbrunnen.Collections.feedItems.reset();
      window.Trinkbrunnen.Collections.feedItems.fetch({
        success: function() {
          window.Trinkbrunnen.Views.feed.addFeedItemCollection(window.Trinkbrunnen.Collections.feedItems);
          window.Trinkbrunnen.Collections.feedItems.timestamp = new Date().getTime();
          self.canSlideArticle('left');
        },
        error: function() {
          if (window.Trinkbrunnen.isMobile()) {
            $('#reloading_feed').show();
            window.Trinkbrunnen.Views.feed.reset();
          }
        },
        add: true
      });
    }
  },
  getUserLocation: function() {
    if (window.Trinkbrunnen.isMobile()) {
      this.navigate("", {
        trigger: false,
        replace: false
      });
    }
    var self = this;

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('map_canvas map-wrap header-maptype header-navigation');

      if (window.google === undefined) {
        this.displayOnly('map_canvas map-wrap header-navigation reloading_map');
        return;
      }

      if (window.Trinkbrunnen.Views.map.userLocationMarker != null && this.isWatchingID != null) {
        window.Trinkbrunnen.Views.map.centerUserLocation();
        return;
      }
    } else {
      this.displayOnly('map_canvas map-wrap appinfo left-hand-phone right-hand-phone header-navigation');

      if (window.Trinkbrunnen.Views.map.userLocationMarker != null) {
        window.Trinkbrunnen.Views.map.centerUserLocation();
        return;
      }
      //TODO: Check if EventDispatcher.off(); should be written here
    }

    this.addEventListeners();
    this.getPosition();

    //at button click center the userlocation by success
    window.Trinkbrunnen.EventDispatcher.on("success:userLocation", function() {
      window.Trinkbrunnen.Views.map.centerUserLocation();
      window.Trinkbrunnen.EventDispatcher.off(null, null, "once:userLocation:center");
    }, "once:userLocation:center");
  },
  getPosition: function() {
    if (navigator.geolocation) {
      if (window.Trinkbrunnen.isMobile()) {
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
      window.Trinkbrunnen.EventDispatcher.trigger("error:userLocation", window.Trinkbrunnen.MessageHandler.messages.position.error.unsupported);
    }
  },
  getPositionError: function(error) {
    //FIXME: Firefox Bug "Not Now" doesn't lead to error callback
    //FIXME: Android Bug "Not now" -||-
    var message = "";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = window.Trinkbrunnen.MessageHandler.messages.position.error.denied;
        break;
      case error.POSITION_UNAVAILABLE:
        message = window.Trinkbrunnen.MessageHandler.messages.position.error.unavailable;
        break;
      case error.TIMEOUT:
        message = window.Trinkbrunnen.MessageHandler.messages.position.error.timeout;
        break;
      case error.UNKNOWN_ERROR:
        message = window.Trinkbrunnen.MessageHandler.messages.position.error.unknown;
        break;
      default:
        message = window.Trinkbrunnen.MessageHandler.messages.position.error.standard;
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
  showLakes: function() {
    this.navigate("lakes", {
      trigger: false,
      replace: false
    });

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('lakes back');

      /**
       * When entering lakes section reload the lake
       * graphics if where aren't completely loaded
       */
      setTimeout(function() {
        if (!window.Trinkbrunnen.Router.areImagesLoaded()) {
          Array.prototype.forEach.call(document.images, function(image) {
            if (image.className === "lake-graphic") {
              if (image.src.indexOf("?") >= 0) {
                var path = image.src.substr(0, image.src.indexOf("?"));
                image.src = path + "?" + new Date().getTime();
              } else {
                image.src = image.src + "?" + new Date().getTime();
              }
            }
          });
        }
      }, 500);
    } else {
      this.displayOnly('map_canvas map-wrap lakes header-navigation');

      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
    }

    if (window.Trinkbrunnen.Collections.lakes.timestamp < new Date().getTime() - 1000 * 60 * 15) {
      window.Trinkbrunnen.Collections.lakes.reset();
      window.Trinkbrunnen.Collections.lakes.fetch({
        success: function() {
          window.Trinkbrunnen.Views.lakes.addLakesCollection(window.Trinkbrunnen.Collections.lakes);
          window.Trinkbrunnen.Collections.lakes.timestamp = new Date().getTime();

          //TODO: For mobile and refactoring the copies
          if (!window.Trinkbrunnen.isMobile()) {
            $("#lakes-listing ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
            $("#lakes-listing ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
          }
          if (window.Trinkbrunnen.isMobile()) {
            $("#lakes ul li:nth-child(2n+1) ul").css('background', '#E9E9E9');
          }
        },
        error: function() {
          if (window.Trinkbrunnen.isMobile()) {
            $('#reloading_lakes').show();
            window.Trinkbrunnen.Views.lakes.reset();
          }
        },
        add: true
      });
    } else {
      if (!window.Trinkbrunnen.isMobile()) {
        $("#lakes-listing ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
        $("#lakes-listing ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
      }
    }
  },
  showAbout: function() {
    this.navigate("about", {
      trigger: false,
      replace: false
    });

    if (window.Trinkbrunnen.isMobile()) {
      this.displayOnly('info back');
    } else {
      this.displayOnly('map_canvas map-wrap info header-navigation');

      if ($('#map-wrap').css('top') == '250px') {
        this.scrollMap();
      }
    }
  },
  mainElements: new Array('map-wrap', 'map_canvas', 'header-maptype', 'address', 'map_pointer', 'map_pointer_text', 'feed', 'info', 'maptype', 'appinfo', 'reloading_lakes', 'reloading_map', 'reloading_feed', 'left-hand-phone', 'right-hand-phone', 'back', 'failure', 'header-navigation', 'lakes'),
  displayOnly: function(elementsToShow) {
    //TODO: show map all the time, but at lakes, about and rss only in background
    var elementsArray = elementsToShow.split(" ");
    window.Trinkbrunnen.Views.map.saveCurrentCenter();
    var shouldShow;

    for (idx in this.mainElements) {
      shouldShow = false;
      for (i in elementsArray) {
        if (elementsArray[i] == this.mainElements[idx]) {
          shouldShow = true;
          break;
        }
      }

      if (shouldShow) {
        $('#' + this.mainElements[idx]).show();
      } else {
        $('#' + this.mainElements[idx]).hide();
      }
    }

    window.Trinkbrunnen.Views.map.resizeMap();
    window.Trinkbrunnen.Views.map.setCurrentCenterNew();
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
    if (window.Trinkbrunnen.isMobile()) {
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
      var sizeFeedItemCollection = window.Trinkbrunnen.Collections.feedItems.size();
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
  toggleClusterSingled: function() {
    window.Trinkbrunnen.Views.map.toggleClusterSingled();
  },
  areImagesLoaded: function() {
    for (var i = 0; i < document.images.length; i++) {
      if (!document.images[i].complete) {
        return false;
      }
    }
    return true;
  }
});
