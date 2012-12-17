var MapTypeView = Backbone.View.extend({
  el: $("#maptype"),
  mapView: "",
  changeType: function(type) {
    if (type != 'roadmap' && type != 'satellite' && type != 'hybrid' && type != 'terrain') {
      return false;
    }
    
   /*
    * TODO: Dispatch Event if offline then show Message
    * 
   if(navigator.connection.type == CONNECTION.NONE){
     window.dispatchEvent("non connection"); 
     return false;
   }
    */
    
    
    this.mapView.map.setMapTypeId(type);
  }
}); 