var NavigationView = Backbone.View.extend({
  el: $("#navigation"),
  initialize: function() {
    this.render();
  },
  render: function() {
    var variables = {
      first: { title: "Position", url: "#position", onclick: "" },
      second: { title: "Adresse", url: "#address", onclick: "" },
      third: { title: "Brunnen", url: "#next", onclick: "" },
      fourth: { title: "News", url: "#feed" },
      fifth: { title: "Kartentyp", url: "#maptype", onclick: "" },
      sixth: { title: "Info", url: "#about" },
    };
    
    var template = _.template( $('#navigation_template').html(), variables );
    $(this.el).html(template);
  }
});