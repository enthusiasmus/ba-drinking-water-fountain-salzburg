var AppRouter = Backbone.Router.extend({
  routes: {
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  showAdressSearch: function(){
  	adressView.switchVisibility();
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