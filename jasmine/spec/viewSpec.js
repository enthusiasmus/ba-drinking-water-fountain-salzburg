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
	});

});