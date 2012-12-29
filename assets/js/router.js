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
    this.eventDispatcher = {};
    _.extend(this.eventDispatcher, Backbone.Events);
  },
  init: function() {
    var self = this;
    window.Trinkbrunnen.Collections.marker.url = 'wis.php';
    window.Trinkbrunnen.Collections.feedItem.url = 'rss.php';
    window.Trinkbrunnen.Views.map.model = window.Trinkbrunnen.Models.map;

    try {
      if (!(Backbone.history.start()))
        throw "Couldn't start backbone history!";
    } catch(e) {
    }

    //TODO: default for pc, mobile and mobile with phonegab (navigator.connection.type)
    if (!this.isMobile()) {
      this.initializeMap();
    } else {
      this.loadMarkersToMap()
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
      //color the lake temperatues 1,2,5,6,9,10,etc.
      $("#lakes ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
      $("#lakes ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
    } else {
      $("#heaver-navigation .menu-item").bind("touchstart", function() {
        $(this).addClass("active-" + $(this).attr('id'));
      }).bind("touchend", function() {
        $(this).removeClass("active-" + $(this).attr('id'));
      });

      $("#navigation .menu-item").bind("touchstart", function() {
        $(this + " a").addClass("active-navi-a");
        $(this + " a span").addClass("active-" + $(this).attr('id'));
      }).bind("touchend", function() {
        $(this + " a").removeClass("active-navi-a");
        $(this + " a span").removeClass("active-" + $(this).attr('id'));
      });

      if (window.innerWidth >= 768) {
        $("#lakes ul li:nth-child(4n+1) ul").css('background', '#E9E9E9');
        $("#lakes ul li:nth-child(4n+2) ul").css('background', '#E9E9E9');
        $("#lakes ul li ul").css('width', '50%');
      } else {
        $("#lakes ul li:nth-child(2n+1) ul").css('background', '#E9E9E9');
      }
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
  loadMarkersToMap: function() {
    var self = this;
    window.Trinkbrunnen.Collections.marker.fetch({
      success: function() {
        window.Trinkbrunnen.Views.map.addMarkerCollection(window.Trinkbrunnen.Collections.marker);
        window.Trinkbrunnen.Views.map.placeMarkersToMap();
      },
      error: function() {
        if (self.isMobile()) {
          alert("Trinkbrunnen konnten nicht geladen werden!");
        } else {
          //TODO: Think about a failure message place, when map is not scrolled up
          //self.showFailureMessage("Trinkbrunnen konnten nicht geladen werden!");
          console.log("fail");
        }
      },
      add: true
    });
  },
  initializeMap: function() {
    window.Trinkbrunnen.Views.map.render();
    this.loadMarkersToMap();
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
      this.eventDispatcher.on('loadedFeed', function() {
        var element = _.first(window.Trinkbrunnen.Collections.feedItem.toArray());
        var template = _.template($("#template_article").html(), {
          pubDate: element.escape("pubDate"),
          link: element.escape("link"),
          title: element.escape("title")
        });
        $('#latest_feed').html(template);
        $('#latest_feed').show();

        self.eventDispatcher.off('loadedFeed');
      });

      if (window.Trinkbrunnen.Collections.feedItem.timestamp < new Date().getTime() - 1000 * 60 * 60 * 12) {
        window.Trinkbrunnen.Collections.feedItem.reset();
        window.Trinkbrunnen.Collections.feedItem.fetch({
          success: function() {
            window.Trinkbrunnen.Collections.feedItem.timestamp = new Date().getTime();
            self.eventDispatcher.trigger('loadedFeed');
            self.canSlideArticle('left');
          },
          error: function() {
            if (self.isMobile()) {
              alert("Feed konnte nicht geladen werden!");
            } else {
              //TODO: Think about a failure message place, when map is not scrolled up
              //self.showFailureMessage("Feed konnte nicht geladen werden!");
              console.log("fail");
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
        $('#feed').css('display', 'none');
        $('#about').css('display', 'none');
        $('#lakes').css('display', 'none');
      });
    }
  },
  nextFountain: function() {
    /*
     * TODO: Dispatch Event if offline then show Message
     *
     if(navigator.connection.type == CONNECTION.NONE){
     window.dispatchEvent("non connection");
     return false;
     }
     */

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
      window.Trinkbrunnen.Views.map.drawRouteUserLocationToNextFountain();
      self.eventDispatcher.off('drawRoute');
      if (window.Trinkbrunnen.Views.map.infoBox) {
        window.Trinkbrunnen.Views.map.infoBox.close();
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
      window.Trinkbrunnen.Views.map.drawRouteUserLocationToFountain(id);
      self.eventDispatcher.off('drawRouteTo');
      if (window.Trinkbrunnen.Views.map.infoBox) {
        window.Trinkbrunnen.Views.map.infoBox.close();
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
    /*
     * TODO: Dispatch Event if offline then show Message
     *
     if(navigator.connection.type == CONNECTION.NONE){
     window.dispatchEvent("non connection");
     return false;
     }
     */

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

        window.Trinkbrunnen.Views.map.removeUserLocation();
        window.Trinkbrunnen.Views.map.placeUserLocation(window.Trinkbrunnen.Models.userLocation);
        window.Trinkbrunnen.Views.map.centerUserLocation(window.Trinkbrunnen.Models.userLocation);

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
        timeout: 30000
      });
    } else {
      if (self.isMobile()) {
        alert("Ihr Browser unterstützt keine Positionsbestimmung!");
      } else {
        self.showFailureMessage("Ihr Browser unterstützt keine Positionsbestimmung!");
      }
    }
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
