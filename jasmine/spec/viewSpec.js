describe('VIEWS', function() {

	describe('MapView', function() {

	  beforeEach(function() {
	  	this.mapModel = new MapModel;
			this.mapView = new MapView({model: this.mapModel});
	  });
	  
	  it('should call render-Method when View is initialized', function() {
	    spyOn(this.mapView, 'render');
	    this.mapView.initialize();
	    expect(this.mapView.render).toHaveBeenCalled();
	  }); 

	  it('should call method "placeMarkersToMap"', function() {
	  	spyOn(this.mapView, 'placeMarkersToMap');
	  	
	  	var data = "foobar";
	  	placeMarkers(data);
	  	
	  	expect(this.mapView.placeMarkersToMap).toHaveBeenCalled();
	  });

	});

});