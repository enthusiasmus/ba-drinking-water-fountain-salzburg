var LakesView = Backbone.View.extend({
  el: $("#lakes"),
  lakesCollection: undefined,
  render: function() {
    _.each(this.lakesCollection.toArray(), function(lakeModel) {
      var template = _.template($("#template_lake_temperature").html(), {
        lake: lakeModel.get("lake"),
        city: lakeModel.get("city"),
        value: lakeModel.get("value"),
        timestamp: lakeModel.get("timestamp")
      });
      $('#lakes-listing > ul').append(template);
    });
  },
  addLakesCollection: function(lakesCollection) {
    this.lakesCollection = lakesCollection;
    this.render();
  },
  isMobile: function() {
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  }
});
