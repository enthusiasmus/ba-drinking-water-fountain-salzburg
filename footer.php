</body>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
<script type="text/javascript" src="assets/js/jquery.js"></script>
<script type="text/javascript" src="assets/js/underscore.js"></script>
<script type="text/javascript" src="assets/js/backbone.js"></script>
<script type="text/javascript" src="assets/js/model.js"></script>
<script type="text/javascript" src="assets/js/view.js"></script>
<script type="text/javascript" src="assets/js/router.js"></script>
<script type="text/javascript" src="assets/js/collection.js"></script>

<?php include("assets/js/templates/mapViewTemplates.html"); ?>



<script type="text/javascript">

//set routes
var app_router = new AppRouter();
Backbone.history.start();

//initialize objects
var map = new Map({name: "Google Map"});
var m1 = new Marker({name: "Google Map 1"});
var m2 = new Marker({name: "Google Map 2"});
var m3 = new Marker({name: "Google Map 3"});



var markerCollection = new MarkerCollection([m1, m2, m3]);

//set views
var map_view = new MapView;


//_.each(markerCollection.toArray(), function(m){ alert(m.get("name")); });
</script>
</html>