var AppRouter = Backbone.Router.extend({
  routes: {
  	"adress": "showAdressSearch",
    "location": "showLocation",
    "next": "showRouteNextSpring",
    "feed": "showRssFeed",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  showAdressSearch: function(){
  	//alert("Adresseingabe zum Suchen")
  },
  showLocation: function(){
  	getUserLocation();
  },
  showRouteNextSpring: function(){
  	//alert("Route zum nächsten Trinkbrunnen")
  },
  showRssFeed: function(){
  	getFeed();
  },
  showAbout: function(){
  	//alert("Info-Seite");
  },
  defaultRoute: function( action ){
    //alert("Default-Route: " + action); 
  }
});