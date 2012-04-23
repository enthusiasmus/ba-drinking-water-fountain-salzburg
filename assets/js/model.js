var Map = Backbone.Model.extend({
	initialize: function() {
		//alert("Map wurde erzeugt");	
	},
	name: ""
});

var Marker = Backbone.Model.extend({
	defaults: {
		latitude: 0,
		longitude: 0
    },
	initialize: function() {
		//alert("Marker wurde erzeugt");	
	},
	name: "",
	latitude: 0,
	longitude: 0
});