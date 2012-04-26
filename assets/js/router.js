var AppRouter = Backbone.Router.extend({
  routes: {
  	"adress": "showAdressSearch",
    "next": "showRouteNextSpring",
    "feed": "showRssFeed",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  showAdressSearch: function(){
  	//alert("Adresseingabe zum Suchen")
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