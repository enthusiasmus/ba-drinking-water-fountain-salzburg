var MarkerCollection = Backbone.Collection.extend({
	initialize: function(){
	},
	model: MarkerModel,
	parse: function(data) {
		for(idx in data){
			var markerModel = new MarkerModel({
				latitude: data[idx].latitude, 
				longitude: data[idx].longitude,
				title: data[idx].f_key + ": " + data[idx].water_distributor + " - " + data[idx].fontain_name
			});
			this.add(markerModel);
		}
	}
});

var FeedItemCollection = Backbone.Collection.extend({
  initialize: function() {
  },
  model: FeedItemModel
});