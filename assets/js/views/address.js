var AddressView = Backbone.View.extend({
  el: $("#address"),
  show: function() {
    $(this.el).show();
  },
  hide: function() {
    $(this.el).hide();
  },
  switchVisibility: function() {
    $(this.el).toggle();
  },
  mapView: "",
  events: {
    'click input[name=search_address]': 'searchAddress',
    'keypress input[name=address]': 'keypress'
  },
  keypress: function(event) {
    if (event.keyCode == 13) {
      this.searchAddress();
    }
  },
  searchAddress: function() {
    var geocoder = new google.maps.Geocoder();
    var address = $('input[name=address]').val();
    this.blurAllElements();
    
    if (address.length <= 0) {
      window.Trinkbrunnen.MessageHandler.addMessage('Keine Suchergebnisse!');
      $(self.el).hide();
      self.blurAllElements();
      if (self.mapView.infoBox) {
        self.mapView.infoBox.close();
      }
      return;
    }

    var self = this;
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        self.mapView.map.setCenter(results[0].geometry.location);
        self.mapView.map.fitBounds(results[0].geometry.viewport);
      } else {
        window.Trinkbrunnen.MessageHandler.addMessage('Keine Suchergebnisse!');
      }

      $(self.el).hide();
      self.blurAllElements();
      if (self.mapView.infoBox) {
        self.mapView.infoBox.close();
      }
    });
  },
  blurAllElements: function() {
    document.activeElement.blur();
    $("input").blur();
  },
  isMobile: function() {
    var index = navigator.appVersion.indexOf("Mobile");
    return (index > -1);
  }
});
