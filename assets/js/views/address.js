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
    'click input[name=search_adress]': 'searchAddress',
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
        self.mapView.map.fitBounds(results[0].geometry.bounds);
        $(self.el).hide();
      }
      else{
        console.log("Geocode was not successful for the following reason: " + status);
        $(self.el).hide();
      }
    });
  }
});