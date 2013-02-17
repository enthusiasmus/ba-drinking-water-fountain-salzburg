/**
 * Document finished loading starts app
 */

$(document).ready(function() {
  if (navigator.appVersion.indexOf("Mobile") < 0) {
    $('#slider').nivoSlider({
      effect: 'fade',
      animSpeed: 800,
      pauseTime: 5000,
      directionNav: false,
      controlNav: false,
      pauseOnHover: false
    });
  }

  window.Trinkbrunnen.init();
});

window.Trinkbrunnen = {
  Models: {
    map: new MapModel,
    feed: new FeedModel,
    userLocation: new UserLocationModel
  },
  Collections: {
    marker: new MarkerCollection,
    feedItem: new FeedItemCollection
  },
  Views: {
    map: new MapView,
    feed: new FeedView,
    info: new InfoView,
    mapType: new MapTypeView,
    address: new AddressView
  },
  Router: new AppRouter,
  EventDispatcher: _.extend({}, Backbone.Events),
  init: function() {
    this.Router.init();
  },
  isOnline: function(){
    //TODO: whats about mobile without phonegab, mobile, mobile website, website?
    //navigator.connection.type == "NONE" oder navigator.isOnline oder google != 'undefined'
    return true;
  },
  Messages: {
    position: {
      error: {
        standard: "Fehler bei der Positionsbestimmung!",
        timeout: "Zeitüberschreitung beim Ermitteln der Position!",
        denied: "Zugriff auf Position verweigert!",
        unavailable: "Position konnte nicht ermittelt werden!",
        unknown: "Positionsbestimmung zur Zeit nicht möglich!",
        unsupported: "Ihr Gerät unterstützt keine Positionsbestimmung!"
      }
    },
    route: {
      error: "Keine Route gefunden!"
    },
    fountain: {
      error: {
        unloadable: "Trinkbrunnen konnten nicht geladen werden!"
      }
    },
    feed: {
      error: {
        unloadable: "News konnten nicht geladen werden!"
      }
    },
    state: {
      offline: "Bitte stellen Sie eine Verbindung mit dem Internet her!"
    }
  },
  Urls: {
    feed: "rss.php",
    fountain: "wis.php"
  }
};

/* HTML5 MANIFEST */
function logEvent(event) {
  console.log(event.type);
}
window.applicationCache.addEventListener('checking', logEvent, false);
window.applicationCache.addEventListener('noupdate', logEvent, false);
window.applicationCache.addEventListener('downloading', logEvent, false);
window.applicationCache.addEventListener('cached', logEvent, false);
window.applicationCache.addEventListener('updateready', logEvent, false);
window.applicationCache.addEventListener('obsolete', logEvent, false);
window.applicationCache.addEventListener('error', logEvent, false);
