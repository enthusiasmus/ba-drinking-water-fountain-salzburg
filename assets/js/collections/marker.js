var MarkerCollection = Backbone.Collection.extend({
	model: MarkerModel,
	parse: function(data){
		var markers = new Array();
		for(idx in data){
		  if(data[idx].fontain_name == "")
		    var title = data[idx].water_distributor + " - " + data[idx].fontain_name;
		  else 
		    var title = data[idx].water_distributor;
		    
			var markerModel = new MarkerModel({
				id: idx,
				latitude: data[idx].latitude, 
				longitude: data[idx].longitude,
				title: title
			});
			markers.push(markerModel);
		}
		return markers;
	}
});