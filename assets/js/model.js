var MapModel = Backbone.Model.extend({
	defaults: {
		centerLatitude: 47.409503,
		centerLongitude: 13.072815,
		zoom: 7,
	},
	initialize: function(){
	},
});

var MarkerModel = Backbone.Model.extend({
	defaults:{
		latitude: 0,
		longitude: 0,
		imageUrl: 'assets/img/marker.png',
		title: "Trinkbrunnen",
	},
	initialize: function(){		
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
		latitude: 0,
		longitude: 0,
		title: "Trinkbrunnen",
	},
	initialize: function(){
	},
});
UserLocationModel.prototyp = MarkerModel;

var FeedModel = Backbone.Model.extend({
	defaults: {
		title: 'RSS Feed'
	},
	initialize: function() {		
	}
});

var FeedItemModel = Backbone.Model.extend({
	defaults: {
		title: '',
		description: '',
		pubDate: '',
		link: ''
	},
	initialize: function() {		
	}
});