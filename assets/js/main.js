/**
 * Document finished loading starts app
 */

$(document).ready(function(){
  if(navigator.appVersion.indexOf("Mobile") < 0){
    $('#slider').nivoSlider({
      effect : 'fade',
      animSpeed : 800,
      pauseTime : 5000,
      directionNav : false,
      controlNav : false,
      pauseOnHover : false
    });
  }
  
  window.Trinkbrunnen = new AppRouter;
  window.Trinkbrunnen.init();
});