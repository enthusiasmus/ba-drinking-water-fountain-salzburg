var MapView = Backbone.View.extend({
	el: $("#map_canvas"),
	initialize: function() {
		this.render();
	},
	render: function() {
		
		var myOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);


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

var NavigationView = Backbone.View.extend({
	el: $("#navigation"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var variables = {
			title: "Meine erste Seite",
			text: "juhuuuuuuu"
		};
		
		var template = _.template( $('#navigation_template').html(), variables );
		$(this.el).html(template);
	}
});
