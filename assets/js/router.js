var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "maptyp/:id": "setMaptyp",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  index: function() {
  	$('#feed').hide();
  	$('#info').hide();
  	$('#search').hide();
  },
  showAdressSearch: function(){
  	$('#feed').hide();
  	$('#info').hide();
  	$('#map_canvas').show();  	
  	adressView.switchVisibility();
  },
  showRssFeed: function(){
  	getFeed();
  	$('#map_canvas').hide();
  	$('#info').hide();
  	$('#search').hide();  	
  },
  setMaptyp: function(typ) {
    
  },
  showAbout: function(){
  	$('#map_canvas').hide();
  	$('#feed').hide();  	
  	$('#search').hide();  	
  	$('#info').show();
  },
  defaultRoute: function( action ){
    //alert("Default-Route: " + action); 
  }
});