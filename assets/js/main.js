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
  isMobile: function(){
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  },
  isOnline: function(){
    //TODO: whats about mobile without phonegab, mobile, mobile website, website?
    //navigator.connection.type == "NONE" oder navigator.isOnline oder google != 'undefined'
    return true;
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
