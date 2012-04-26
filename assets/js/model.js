var MapModel = Backbone.Model.extend({
	initialize: function() {
	},
	name: "",
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
	defaults:{
		initialZoom: 14,
		time: 0,
		precision: 0,
		altitude: 0,
		altitudeAcc: 0,
		speed: 0,
		heading: 0,
		precisionStrokeColor: "#0000FF",
		precisionStrokeOpacity: 0.4,
		precisionStrokeWeight: 2,
		precisionFillColor: "#0000FF",
		precisionFillOpacity: 0.1,
		imageUrl: 'assets/img/userlocation.png',
		imageWidth: 24,
		imageHeight: 24,
		imageOriginX: 0,
		imageOriginY: 0,
		imageAnchorX: 12,
		imageAnchorY: 12,
	},
	initialize: function(){
		//alert('Der Standort um ' + time + ' lautet ' + lat + ', ' + lng + ', Genaugikeit: ' + precision + ', Höhe: ' + altitude + ', Geschwindigkeit: ' + speed + ', Bewegung in: ' + heading);
	},
});
UserLocationModel.prototyp = MarkerModel;