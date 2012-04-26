var AppRouter = Backbone.Router.extend({
  routes: {
  	"adress": "showAdressSearch",
    "next": "showRouteNextSpring",
    "rss": "showRssFeed",
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
  	//alert("RSS-Feed")
  },
  showAbout: function(){
  	//alert("Info-Seite");
  },
  defaultRoute: function( action ){
    //alert("Default-Route: " + action); 
  }
});