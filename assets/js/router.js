var AppRouter = Backbone.Router.extend({
	routes: {
		"*actions": "defaultRoute"
	},
	defaultRoute: function(actions) {
		alert(actions);
	}
});