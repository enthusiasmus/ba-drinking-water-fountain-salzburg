var MarkerCollection = Backbone.Collection.extend({
	initialize: function(){
		console.log("Marker-Collection wurde erzeugt");	
	},
	model: MarkerModel
});