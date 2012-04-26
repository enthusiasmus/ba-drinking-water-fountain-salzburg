var MarkerCollection = Backbone.Collection.extend({
	initialize: function(){
	},
	model: MarkerModel
});

var FeedCollection = Backbone.Collection.extend({
  initialize: function() {
    console.log("Feed-Collection wurde erzeugt"); 
  },
  model: FeedModel
});