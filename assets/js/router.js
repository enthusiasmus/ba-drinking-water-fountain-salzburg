var AppRouter = Backbone.Router.extend({
  routes: {
  	"": "index",
  	"adress": "showAdressSearch",
    "feed": "showRssFeed",
    "about": "showAbout",
    "*actions": "defaultRoute"
  },
  index: function() {
		this.displayOnly("map_canvas");	
  },
  showAdressSearch: function(){
  	adressView.switchVisibility();
		this.displayOnly("map_canvas");	
  },
  showRssFeed: function(){
  	getFeed();
 		this.displayOnly("feed");	
  },
  showAbout: function(){
		this.displayOnly("info");
  },
  defaultRoute: function( action ){
		this.displayOnly("map_canvas");
  },
  mainElements: new Array("adress", "map_canvas", "feed", "info"),
  displayOnly: function(elementToShow){
		for(idx in this.mainElements) {
		  if(elementToShow != this.mainElements[idx])
		  	$('#'+this.mainElements[idx]).hide();
		  else
		  	$('#'+this.mainElements[idx]).show();
		}
  }
});