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
  init: function() {
    this.Router.init();
  },
  isOnline: function(){
    return true;
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
