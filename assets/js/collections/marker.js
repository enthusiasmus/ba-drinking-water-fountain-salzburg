var MarkerCollection = Backbone.Collection.extend({
	model: MarkerModel,
	parse: function(data){
		var markers = new Array();
		for(idx in data){
			var markerModel = new MarkerModel({
				latitude: data[idx].latitude, 
				longitude: data[idx].longitude,
				title: data[idx].f_key + ": " + data[idx].water_distributor + " - " + data[idx].fontain_name
			});
			markers.push(markerModel);
		}
		return markers;
	}
});