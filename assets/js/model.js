var MapModel = Backbone.Model.extend({
	initialize: function() {
		//alert("Map wurde erzeugt");	
	},
	name: ""
});

var MarkerModel = Backbone.Model.extend({
	defaults: {
		latitude: 0,
		longitude: 0,
		title: "Trinkbrunnen",
	}, 
	initialize: function() {		
		console.log("Marker created");
	},
});