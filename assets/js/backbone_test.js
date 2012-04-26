var modelTest = Backbone.Model.extend({
	defaults: {
		name: "defaultname"
	}
});

var test = new modelTest;
alert(test.get("name"));
