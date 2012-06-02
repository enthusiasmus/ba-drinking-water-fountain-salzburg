var MapTypeView = Backbone.View.extend({
  el: $("#maptype"),
  initialize: function() {
    this.render();
  },
  render: function() {
    var template = _.template( $('#maptype_template').html());
    $(this.el).html(template);
  },
  mapView: "",
  changeType: function(type) {
    if(type != 'roadmap' && type != 'satellite' && type != 'hybrid' && type != 'terrain') { return false; }
    this.mapView.map.setMapTypeId(type);
  }
});