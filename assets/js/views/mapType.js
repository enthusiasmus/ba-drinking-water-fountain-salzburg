var MapTypeView = Backbone.View.extend({
  el: $("#maptype"),
  mapView: "",
  changeType: function(type) {
    if(type != 'roadmap' && type != 'satellite' && type != 'hybrid' && type != 'terrain') { return false; }
    this.mapView.map.setMapTypeId(type);
  }
});