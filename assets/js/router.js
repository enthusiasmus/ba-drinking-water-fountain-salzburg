var AppRouter = Backbone.Router.extend({
	routes: {
		"*actions": "defaultRoute", //matches all actions
		"/search": "searchRoute"
	},
	defaultRoute: function(actions) {
		//alert(actions);
	}
});