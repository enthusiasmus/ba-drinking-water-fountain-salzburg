var AddressView = Backbone.View.extend({
  el: $("#address"),
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
  events: {
    'click input[name=search_address]': 'searchAddress',
    'keypress input[name=address]': 'keypress'
  },
  keypress: function(event){
    if(event.keyCode == 13)
      this.searchAddress();
  },
  searchAddress: function(){
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
        var rotateValue = 0;
        var pointerText = '';

        console.log(diffLat + ", " + diffLng);

        if(diffLat > 0 && diffLng > 0) {
          rotateValue = 45;
          pointerText = 'NO';
        } else if(diffLat > 0 && diffLng < 0) {
          rotateValue = 130;
          pointerText = 'SO';
        } else if(diffLat < 0 && diffLng < 0) {
          rotateValue = 225;
          pointerText = 'SW';
        } else {
          rotateValue = 315;
          pointerText = 'NW';
        }

        $('#map_pointer').css({'-moz-transform': 'rotate(' + rotateValue + 'deg)',
                                '-webkit-transform': 'rotate(' + rotateValue + 'deg)',
                                '-ms-transform': 'rotate(' + rotateValue + 'deg)'});
        $('#map_pointer_text').html(pointerText);


    		//hide the search-box and show the pointer
    		$(self.el).hide();
        $('#map_pointer').fadeIn();
        $('#map_pointer_text').fadeIn();
      }
      else{
        console.log("Geocode was not successful for the following reason: " + status);
        $(self.el).hide();
      }
    });
  }
});