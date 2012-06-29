var MarkerCollection = Backbone.Collection.extend({
	model: MarkerModel,
	parse: function(data){
		var markers = new Array();
		for(idx in data){
			var markerModel = new MarkerModel({
				id: idx,
				latitude: data[idx].latitude, 
				longitude: data[idx].longitude,
				title: data[idx].water_distributor
			});
			markers.push(markerModel);
		}
		return markers;
	}
});