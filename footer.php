</body>
	
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
	<script type="text/javascript" src="assets/js/jquery.js"></script>
	<script type="text/javascript" src="assets/js/underscore.js"></script>
	<script type="text/javascript" src="assets/js/backbone.js"></script>
	
	<script type="text/javascript" src="assets/js/model.js"></script>
	<script type="text/javascript" src="assets/js/view.js"></script>
	<script type="text/javascript" src="assets/js/router.js"></script>
	<script type="text/javascript" src="assets/js/collection.js"></script>
	
	<script type="text/javascript" src="assets/js/ajax.js"></script>
	
	<?php include("templates/mapView.html"); ?>
	<?php include("templates/navigationView.html"); ?>	
	
	<script type="text/javascript">
		$(document).ready(function(){
			//History uses iframes so the dom should be finished loading
			Backbone.history.start();
		});
		
		//reserved variables
		var mainMap;
		
		//set routes
		var appRouter = new AppRouter();
		
		//initialize objects
		var map = new Map({name: "Google Map"});
		var m1 = new Marker({name: "Google Map 1"});
		var m2 = new Marker({name: "Google Map 2"});
		var m3 = new Marker({name: "Google Map 3"});
		
		var markerCollection = new MarkerCollection([m1, m2, m3]);
		
		//set views
		var mapView = new MapView;
		var navView = new NavigationView;
		
		//_.each(markerCollection.toArray(), function(m){ alert(m.get("name")); });
	</script>
</html>