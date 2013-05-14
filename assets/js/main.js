/**
 * Document finished loading starts app
 */

$(document).ready(function() {
  if (window.Trinkbrunnen.isNative === true) {
    document.addEventListener("deviceready", function() {
      window.Trinkbrunnen.init();
    }, false);
  } else {
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
  }
});

window.Trinkbrunnen = {
  Models: {
    map: new MapModel,
    feed: new FeedModel,
    userLocation: new UserLocationModel
  },
  Collections: {
    markers: new MarkerCollection,
    lakes: new LakeCollection,
    feedItems: new FeedItemCollection
  },
  Views: {
    map: new MapView,
    feed: new FeedView,
    lakes: new LakesView,
    mapType: new MapTypeView,
    address: new AddressView
  },
  Router: new AppRouter,
  EventDispatcher: _.extend({}, Backbone.Events),
  init: function() {
    this.Router.init();
  },
  isMobile: function() {
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  },
  isNative: false,
  isOnline: function() {
    if (this.isNative === true) {
      if (navigator.connection.type === Connection.NONE) {
        return false;
      } else {
        return true;
      }
    }
    else{
      return true;
    }
  },
  Urls: {
    feed: "rss.php",
    fountains: "wis.php",
    lakes: "lakes.php",
    graphics: "graphics.php"
  }
};
