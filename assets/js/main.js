/**
 * Document finished loading starts app
 */

$(document).ready(function(){
  window.Trinkbrunnen = new AppRouter();
  window.Trinkbrunnen.init();
});

/**
 * Orientation Stuff
 */

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

/**
 * Offline debugging Stuff
 */

// function logEvent(event) {
  // console.log(event.type);
// }
// 
// window.applicationCache.addEventListener('checking',logEvent,false);
// window.applicationCache.addEventListener('noupdate',logEvent,false);
// window.applicationCache.addEventListener('downloading',logEvent,false);
// window.applicationCache.addEventListener('cached',logEvent,false);
// window.applicationCache.addEventListener('updateready',logEvent,false);
// window.applicationCache.addEventListener('obsolete',logEvent,false);
// window.applicationCache.addEventListener('error',logEvent,false);