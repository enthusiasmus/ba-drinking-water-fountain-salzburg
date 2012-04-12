var MapView = Backbone.View.extend({
	el: $("#map_canvas"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var variables = {
			title: "Meine erste Seite",
			text: "juhuuuuuuu"
		};
		var template = _.template( $('#map_template').html(), variables );
		//this.el.html(template);
		$(this.el).html(template);
	},
	events: {
		"click h2": "doAlert"
	},
	doAlert: function() {
		alert("h2 gelickt!!! :)");
	}
});
