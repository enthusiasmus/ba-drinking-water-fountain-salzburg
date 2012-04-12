</body>
<script type="text/javascript" src="assets/js/jquery.js"></script>
<script type="text/javascript" src="assets/js/underscore.js"></script>
<script type="text/javascript" src="assets/js/backbone.js"></script>
<script type="text/javascript" src="assets/js/model.js"></script>
<script type="text/javascript" src="assets/js/view.js"></script>
<script type="text/javascript" src="assets/js/router.js"></script>
<script type="text/javascript" src="assets/js/collection.js"></script>

<script type="text/javascript">

var app_router = new AppRouter();
Backbone.history.start();

var map = new Map({name: "Google Map"});
var m1 = new Marker({name: "Google Map 1"});
var m2 = new Marker({name: "Google Map 2"});
var m3 = new Marker({name: "Google Map 3"});



var markerCollection = new MarkerCollection([m1, m2, m3]);

//_.each(markerCollection.toArray(), function(m){ alert(m.get("name")); });
</script>
</html>