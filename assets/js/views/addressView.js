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
  dispatchLoadingFinished: function(){
    var event = document.createEvent('Event');
    event.initEvent('loadingFinish', true, true)
    document.dispatchEvent(event);
  },
  searchaddress: function(){
    var geocoder = new google.maps.Geocoder();
    var address = $('input[name=address]').val();
    
    var self = this;
    geocoder.geocode({ 'address': address}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK){
        self.mapView.map.setCenter(results[0].geometry.location);
        if(self.mapView.map.getZoom() == 9)
          self.dispatchLoadingFinished();
        self.mapView.map.setZoom(9);
        
        if(self.currentMarker){
          self.currentMarker.setMap(null);
          self.currentMarker = null;
        }
          
        self.currentMarker = new google.maps.Marker({
            map: self.mapView.map,
            position: results[0].geometry.location
        });
      }
      else{
        alert("Geocode was not successful for the following reason: " + status);
        self.dispatchLoadingFinished();
      }
    });
  }
});