var AppRouter = Backbone.Router.extend({
        routes: {
        	"/:route/:action": "loadView",
            "*actions": "defaultRoute" // Backbone will try match the route above first
        },
		loadView: function( route, action ){ 
            alert(route + "_" + action);
        },
        defaultRoute: function( actions ){
            alert( actions ); 
        }
});

