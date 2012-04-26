</body>
	
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
	<script type="text/javascript" src="assets/js/markerclusterer.js"></script>
	<script type="text/javascript" src="assets/js/jquery.js"></script>
	<script type="text/javascript" src="assets/js/underscore.js"></script>
	<script type="text/javascript" src="assets/js/backbone.js"></script>
	
	<script type="text/javascript" src="assets/js/model.js"></script>
	<script type="text/javascript" src="assets/js/view.js"></script>
	<script type="text/javascript" src="assets/js/router.js"></script>
	<script type="text/javascript" src="assets/js/collection.js"></script>
	
	<script type="text/javascript" src="assets/js/ajax.js"></script>
	<script type="text/javascript" src="assets/js/geolocation.js"></script>
	
	<?php include("templates/mapView.html"); ?>
	<?php include("templates/navigationView.html"); ?>	
	
	<script type="text/javascript">
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
	</script>
</html>