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
		var mainMap;
		var userLocationMarker;
		
		//set routes
		var appRouter = new AppRouter();
		
		//initialize objects
		var map = new Map({title: "Google Map"});
		var m1 = new Marker({latitude: "47.5", longitude: "13.00", title: "hey hey"});
		var m2 = new Marker({title: "Google Map 2"});
		var m3 = new Marker({title: "Google Map 3"});
		
		var markerCollection = new MarkerCollection([m1, m2, m3]);
		
		//set views
		var mapView = new MapView;
		var navView = new NavigationView;
		
		//_.each(markerCollection.toArray(), function(m){ alert(m.get("name")); });
		
		function placeMarkers(data){
			var markers = [];
			for(idx in data){
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[idx].latitude, data[idx].longitude),
					icon: 'assets/img/marker.png',
					title: data[idx].f_key + ": " + data[idx].water_distributor + " - " + data[idx].fontain_name,
				});
				google.maps.event.addListener(marker, 'dblclick', function() {
			    mainMap.setZoom(14);
			    mainMap.setCenter(marker.getPosition());
			  });
			  markers.push(marker);
			}
			var markerCluster = new MarkerClusterer(mainMap, markers);
		}
	</script>
</html>