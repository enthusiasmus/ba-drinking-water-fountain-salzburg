var MarkerCollection = Backbone.Collection.extend({
	initialize: function(){
		console.log("Marker-Collection wurde erzeugt");	
	},
	model: MarkerModel
});

var FeedItemCollection = Backbone.Collection.extend({
  initialize: function() {
    console.log("Feed-Collection wurde erzeugt"); 
  },
  model: FeedItemModel
});