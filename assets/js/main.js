		$(document).ready(function(){
			//History uses iframes so the dom should be finished loading
			Backbone.history.start();
		});
		
		//reserved variables
		var userLocationMarker;
		
		//set routes
		var appRouter = new AppRouter();
		
		//initialize objects
		var mapModel = new MapModel({title: "Google Map"});		
		
		var userLocationModel = new MarkerModel

		//set views
		var mapView = new MapView;
		var navView = new NavigationView;

		var markerCollection = new MarkerCollection;

		function createMarkers(data){
			for(idx in data){
				var markerModel = new MarkerModel({
					latitude: data[idx].latitude, 
					longitude: data[idx].longitude, 
					title: data[idx].f_key + ": " + data[idx].water_distributor + " - " + data[idx].fontain_name});
				markerCollection.push(markerModel, []);
			}
			console.log("finished createMarkers");
			mapView.addMarkerCollection(markerCollection);
			mapView.placeMarkersToMap();
		}
