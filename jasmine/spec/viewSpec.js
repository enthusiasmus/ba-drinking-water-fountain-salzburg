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
	  
	  it('should trigger resize event when calling resizeMap', function(){
	    spyOn(google.maps.event, 'trigger');
	    this.mapView.resizeMap();
	    expect(google.maps.event.trigger).toHaveBeenCalled();
	    expect(google.maps.event.trigger).toHaveBeenCalledWith(this.mapView.map, 'resize');
	  });
	  
	  describe('when working with markers', function(){
	  	beforeEach(function(){
				this.marker1 = new MarkerModel({title: "marker1"});
				this.marker2 = new MarkerModel({title: "marker2"});
				this.markerCollection = new MarkerCollection;
				this.markerCollection.add([this.marker1, this.marker2], []);
				this.mapView.addMarkerCollection(this.markerCollection);
	  	});
	  	afterEach(function() {
				this.marker1 = null;
				this.marker2 = null;
				this.markerCollection = null;
		  });
	  	
		  it('should be able to add markercollection', function(){				
				expect(this.mapView.markerCollection).toEqual(this.markerCollection);
		  });
		  
		  it('should have a markerClusterer on map after call placeMarkersToMap', function(){
		  	expect(this.mapView.markerCluster).toBeUndefined();
		  	this.mapView.placeMarkersToMap();
		  	expect(this.mapView.markerCluster).toBeDefined();
		  	expect(this.mapView.markerCluster.getMap()).toEqual(this.mapView.map);
		  });
		  
		  it('should add listener for closing info windows when clicking on the map', function(){
		    spyOn(google.maps.event, 'addListener');
		    this.mapView.placeMarkersToMap();
		    expect(google.maps.event.addListener).toHaveBeenCalled();
			});
		});
		
	  it('should calculate the correct distance between to points', function(){
	  	var firstPoint = new google.maps.LatLng(47,13);
	  	var secondPoint = new google.maps.LatLng(48,14);
	  	
	    spyOn(google.maps.geometry.spherical, 'computeDistanceBetween');
	    this.mapView.distanceNextFountain(firstPoint, secondPoint);
	    expect(google.maps.geometry.spherical.computeDistanceBetween).toHaveBeenCalled();
			expect(google.maps.geometry.spherical.computeDistanceBetween).toHaveBeenWith(firstPoint, secondPoint);
	  });
	});
});