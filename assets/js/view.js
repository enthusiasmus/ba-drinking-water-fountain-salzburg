var MapView = Backbone.View.extend({
	el: $("#map_canvas"),
	initialize: function() {
		this.render();
	},
	render: function() {
		var myOptions = {
	        center: new google.maps.LatLng(47.500, 13.000),
	        zoom: 7,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	
		mainMap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		var template = _.template( $('#map_template').html() );
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
			first: { title: "Position", url: "location" },
			second: { title: "Brunnen", url: "next" },
			third: { title: "Suche", url: "search" },
			fourth: { title: "News", url: "rss" },
			fifth: { title: "Info", url: "about" },
		};
		
		var template = _.template( $('#navigation_template').html(), variables );
		$(this.el).html(template);
	}
});
