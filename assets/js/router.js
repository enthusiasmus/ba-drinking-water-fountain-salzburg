var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  index: function() {
  	$('#feed').hide();
  	$('#info').hide();
  },
  showAdressSearch: function(){
  	$('#feed').hide();
  	$('#info').hide();
  	adressView.switchVisibility();
  },
  showRssFeed: function(){
  	getFeed();
  	$('#map_canvas').hide();
  	$('#info').hide();
  },
  showAbout: function(){
  	$('#map_canvas').hide();
  	$('#feed').hide();  	
  	$('#info').show();
  },
  defaultRoute: function( action ){
    //alert("Default-Route: " + action); 
  }
});