describe('VIEWS', function() {
	describe('MapView', function() {
	  beforeEach(function() {
	  	this.mapModel = new MapModel;
			this.mapView = new MapView({model: this.mapModel});
	  });
  	afterEach(function() {
	  	this.mapView = null;
	  	this.mapModel = null;
	  });
	  
	  it('should have el named map_canvas', function(){
			expect(this.mapView.$el.selector.split('#')[1]).toEqual('map_canvas');
	  });
	  
	  it('should call render-Method when View is initialized', function() {
	    spyOn(this.mapView, 'render');
	    this.mapView.initialize();
	    expect(this.mapView.render).toHaveBeenCalled();
	  });
	  
	  it('should create map instance when calling render', function(){
			spyOn(google.maps, 'Map');
	    this.mapView.render();
	    expect(google.maps.Map).toHaveBeenCalled();
	  });
	  
	  // it('should take template and set it to the el element when calling render', function(){
			// var template = _.template( $('#map_template').html() );
			// var el = $("#map_canvas");
			// this.mapView.el = el;
			// spyOn(this.mapView.el, 'html');
	    // this.mapView.render();
	    // expect(this.mapView.el.html).toHaveBeenCalled();
	    // expect(this.mapView.el.html).toHaveBeenCalledWith(template);
	  // });
	  
	  
	});
});