var NavigationView = Backbone.View.extend({
  el: $("#navigation"),
  initialize: function() {
    this.render();
  },
  render: function() {
    var template = _.template( $('#navigation_template').html() );
    $(this.el).html(template);
  }
});