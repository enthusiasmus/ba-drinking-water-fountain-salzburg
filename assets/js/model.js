var Map = Backbone.Model.extend({
	initialize: function() {
		//alert("Map wurde erzeugt");	
	},
	name: ""
});

var Marker = Backbone.Model.extend({
	defaults: {
		latitude: 0,
		longitude: 0,
		title: "default title",
  },
  validate: function(attributes){
  	if(attributes.latitude < -90 || attributes.latitude > 90)
  		return "False value for latitude!";
  	else if(attributes.longitude < -180 || attributes.longitude > 180)
  		return "False value for longitude!";
  	else if(attributes.title.length < 0)
  		return "Title is empty!";
  },
	initialize: function() {
		console.log("Marker wurde erzeugt " + this.title);
		
		this.bind("error", function(model, error){
			console.log( error );
    });	
    
    this.isValid();

    this.latlng = new google.maps.LatLng(this.latitude, this.longitude);
    
    this.marker = new google.maps.Marker({
      map: mainMap,
      position: this.latlng
    });
	},
});