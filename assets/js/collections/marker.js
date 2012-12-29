var MarkerCollection = Backbone.Collection.extend({
	model: MarkerModel,
	parse: function(data){
		var markers = new Array();
		for(idx in data){
			var markerModel = new MarkerModel({
				id: idx,
				latitude: data[idx].LATITUDE, 
				longitude: data[idx].LONGITUDE,
				title: data[idx].ROOT_ANL_NAME,
				description: data[idx].ANL_NAME
			});
			markers.push(markerModel);
		}
		return markers;
	},
	comparator: function(marker){
	  //the highest markers should be the first ones
	  return (-1)*marker.get("latitude");
	}
});