var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  index: function(){
  	//index-action
  },
  showAdressSearch: function(){
  	//alert("Adresseingabe zum Suchen")
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