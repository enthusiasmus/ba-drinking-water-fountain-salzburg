var MapModel = Backbone.Model.extend({
	initialize: function() {
	},
	name: ""
});

var MarkerModel = Backbone.Model.extend({
	defaults:{
		latitude: 0,
		longitude: 0,
		title: "Trinkbrunnen",
	}, 
	initialize: function() {		
	},
});

var UserLocationModel = Backbone.Model.extend({
	defaults: {
		time: 0,
		precision: 0,
		altitude: 0,
		altitudeAcc: 0,
		speed: 0,
		heading: 0,
		precisionStrokeColor: 0,
		precisionStrokeOpacity: 0,
		precisionStrokeWeight: 0,
		precisionFillColor: "",
		precisionFillOpacity: 0,		
		precisionRadius: this.precision,
	},
	initialize: function(){
		//alert('Der Standort um ' + time + ' lautet ' + lat + ', ' + lng + ', Genaugikeit: ' + precision + ', Höhe: ' + altitude + ', Geschwindigkeit: ' + speed + ', Bewegung in: ' + heading);
	},
});
UserLocationModel.prototyp = MarkerModel;

var FeedModel = Backbone.Model.extend({
	title: "RSS Feed",
	initialize: function() {		
		console.log("Feed created");
	},
});