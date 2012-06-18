var AddressView = Backbone.View.extend({
  el: $("#address"),
  initialize: function() {
    this.render();
  },
  render: function() {
    var template = _.template( $('#searchaddressTemplate').html());
    $(this.el).html(template);
  },
  show: function(){
    $(this.el).show();
  },
  hide: function(){
    $(this.el).hide();
  },
  switchVisibility: function(){
    $(this.el).toggle();
  },
  mapView: "",
  currentMarker: "",
  events: {
    'click input[type=button]': 'searchaddress'
  },
  searchaddress: function(){
    var geocoder = new google.maps.Geocoder();
    var address = $('input[name=address]').val();
    
    var self = this;
    geocoder.geocode({ 'address': address}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK){
        self.mapView.map.setCenter(results[0].geometry.location);
		self.mapView.map.fitBounds(results[0].geometry.viewport);
        
    var adressPosition = {
      "ab": results[0].geometry.location.lat(),
      "cb": results[0].geometry.location.lng()
    }
    
    //calculate distance and direction to next fontaine
    var nextFountain = self.mapView.nearestFountain(adressPosition);
    
    var diffLat = adressPosition.ab - nextFountain.get('latitude');
    var diffLng = adressPosition.cb - nextFountain.get('longitude');
    var quadrant;

    console.log(diffLat + ", " + diffLng);

    if(diffLat > 0 && diffLng > 0)
      quadrant = 1;
    else if(diffLat > 0 && diffLng < 0)
      quadrant = 2;
    else if(diffLat < 0 && diffLng < 0)
      quadrant = 3;
    else
      quadrant = 4;

    console.log(quadrant);

		//hide the search-box
		$(self.el).hide();
      }
      else{
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }
});