var LakesView = Backbone.View.extend({
  el: $("#lakes"),
  lakesCollection: undefined,
  timestamp: undefined,
  render: function() {
    this.reset();
    _.each(this.lakesCollection.toArray(), function(lakeModel) {
      var template = _.template($("#template_lake_temperature").html(), {
        lake: lakeModel.get("lake"),
        city: lakeModel.get("city"),
        value: lakeModel.get("value"),
        timestamp: lakeModel.get("timestamp"),
        id: lakeModel.get("id")
      });
      $('#lakes-listing > ul').append(template);
    });
  },
  addLakesCollection: function(lakesCollection) {
    this.lakesCollection = lakesCollection;
    this.timestamp = new Date().getTime();
    this.render();
  },
  reset: function() {
    $("#lakes-listing > ul").html("");
  }
});
