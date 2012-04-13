var AppRouter = Backbone.Router.extend({
  routes: {
  	"adress": "showAdressSearch",
    "location": "showLocation",
    "next": "showRouteNextSpring",
    "rss": "showRssFeed",
    "*actions": "defaultRoute"
  },
  showAdressSearch: function(){
  	alert("Adresseingabe zum Suchen")
  },
  showLocation: function(){
  	alert("Derzeitiger Standort")
  },
  showRouteNextSpring: function(){
  	alert("Route zum nächsten Trinkbrunnen")
  },
  showRssFeed: function(){
  	alert("RSS-Feed")
  },
  defaultRoute: function( action ){
      alert("Default-Route: " + action); 
  }
});