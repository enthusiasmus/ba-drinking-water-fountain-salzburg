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
	  
	  it('should add eventlistener for tiles loaded event when calling render', function(){
			spyOn(google.maps.event, 'addListener');
	    this.mapView.render();
	    expect(google.maps.event.addListener).toHaveBeenCalled();
	  });
	  
	  it('should fire an event loadindFinished when calling dispatchLoadingFinished', function(){
			spyOn(document, 'dispatchEvent');
	    this.mapView.dispatchLoadingFinished();
	    expect(document.dispatchEvent).toHaveBeenCalled();
	  });
	  
	  describe('when working only with markers', function(){
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

	  	it('should remove markercluster from map when calling removeMarkersFromMap', function(){
	  		this.mapView.placeMarkersToMap();
	  		expect(this.mapView.markerCluster.getMarkers()).toBeTruthy();
	  		this.mapView.removeMarkersFromMap();
	  		expect(this.mapView.markerCluster.getMarkers()).toEqual([]);
	  	});
		});
		
	  it('should calculate the correct distance between to points', function(){
	  	var firstPoint = new google.maps.LatLng(47,13);
	  	var secondPoint = new google.maps.LatLng(48,14);
	  	
	    spyOn(google.maps.geometry.spherical, 'computeDistanceBetween');
	    this.mapView.distanceCalculator(firstPoint, secondPoint);
	    expect(google.maps.geometry.spherical.computeDistanceBetween).toHaveBeenCalled();
			expect(google.maps.geometry.spherical.computeDistanceBetween).toHaveBeenCalledWith(firstPoint, secondPoint);
	  	
	  	var distance = this.mapView.distanceCalculator();
	  	expect(distance).toBeFalsy();
	  	
	  	distance = this.mapView.distanceCalculator(firstPoint);
	  	expect(distance).toBeFalsy();
	  	
	  	distance = this.mapView.distanceCalculator(secondPoint);
	  	expect(distance).toBeFalsy();
	  	
	  	distance = this.mapView.distanceCalculator(firstPoint, secondPoint);
	  	expect(distance).toBeTruthy();
	  });
	  
	  it('should trigger resize event when calling resizeMap', function(){
	    spyOn(google.maps.event, 'trigger');
	    this.mapView.resizeMap();
	    expect(google.maps.event.trigger).toHaveBeenCalled();
	    expect(google.maps.event.trigger).toHaveBeenCalledWith(this.mapView.map, 'resize');
	  });
	  
	  describe('when working with userlocation', function(){
		  it('should have a position marker and an accuracy circle after calling placePositionMarker', function(){
		  	expect(this.mapView.userLocationMarker).toBeUndefined();
		  	expect(this.mapView.userLocationPrecisionCircle).toBeUndefined();
		  	
		  	var userLocationModel = new UserLocationModel;
		  	this.mapView.placeUserLocation(userLocationModel);
		  	
		  	expect(this.mapView.userLocationMarker).toBeDefined();
		  	expect(this.mapView.userLocationPrecisionCircle).toBeDefined();
		  	
				expect(this.mapView.userLocationMarker.getMap()).toEqual(this.mapView.map);
		  	expect(this.mapView.userLocationPrecisionCircle.getMap()).toEqual(this.mapView.map);
		  });
		  
		  it('should fit bounds of user location when calling centerUserLocation', function(){
		  	var userLocationModel = new UserLocationModel;
				spyOn(this.mapView.map, 'fitBounds');
		    this.mapView.centerUserLocation(userLocationModel);	    
		    expect(this.mapView.map.fitBounds).toHaveBeenCalled();
		  });
		  
		  it('should fit bounds of user location when calling centerUserLocation', function(){
		  	var userLocationModel = new UserLocationModel;
		    var spy = sinon.spy(this.mapView.map, 'fitBounds');
		    this.mapView.centerUserLocation(userLocationModel);	  
				expect(spy.calledOnce).toBeTruthy();
		  });
		  
		  it('should remove user location marker and circle when calling removeUserLocation', function(){
		  	var userLocationModel = new UserLocationModel;
		  	this.mapView.placeUserLocation(userLocationModel);
		  	
		  	expect(this.mapView.userLocationMarker).toBeDefined();
		  	expect(this.mapView.userLocationPrecisionCircle).toBeDefined();
		  	
				this.mapView.removeUserLocation();
				
		  	expect(this.mapView.userLocationMarker).toBeFalsy();
		  	expect(this.mapView.userLocationPrecisionCircle).toBeFalsy();
		  });
		  
			describe('and markers', function(){
				beforeEach(function(){
					this.marker1 = new MarkerModel({title: "marker1"});
					this.marker2 = new MarkerModel({title: "marker2", latitude: 48, longitude: 13});
					this.markerCollection = new MarkerCollection;
					this.markerCollection.add([this.marker1, this.marker2], []);
					this.mapView.addMarkerCollection(this.markerCollection);
					
					var userLocationModel = new UserLocationModel;
					this.mapView.placeUserLocation(userLocationModel);
				});
				
			  it('should calculate return the position of the nearest fountain when calling nearestFountain', function(){
					expect(this.mapView.nearestFountain().lat()).toEqual(48);
					expect(this.mapView.nearestFountain().lng()).toEqual(13);
			  });
			  
			  it('should draw the route to the nearest fountain when calling drawRouteUserLocationToNextFountain', function(){		  	
					this.mapView.drawRouteUserLocationToNextFountain();
					expect(this.mapView.directionsDisplay).toBeDefined();
					expect(this.mapView.directionsService).toBeDefined();
			  });
		  });
		});
	});

	describe('FeedView', function() {

		beforeEach(function() {
	  	this.feedModel = new FeedModel;
			this.feedView = new FeedView({model: this.feedModel});
	  });

	  afterEach(function() {
	  	this.feedView = null;
	  	this.feedModel = null;
	  });

		it('should have el named feed', function(){
			expect(this.feedView.$el.selector.split('#')[1]).toEqual('feed');
	  });

		it('should call render-Method when feedItemCollection is added', function() {
	    spyOn(this.feedView, 'render');
	    this.feedView.addFeedItemCollection();
	    expect(this.feedView.render).toHaveBeenCalled();
	  });

	  it('should fire an event loadindFinished when calling dispatchLoadingFinished', function(){
			spyOn(document, 'dispatchEvent');
	    this.feedView.dispatchLoadingFinished();
	    expect(document.dispatchEvent).toHaveBeenCalled();
	  });

	  /* describe('FeedItems', function(){

	  	beforeEach(function(){
				this.news1 = new FeedItemModel({title: 'News 1', description: 'Kurztext', pubDate: '2012-05-28', link: 'www.seppeisl.at/'});
				this.news2 = new FeedItemModel({title: 'News 2', description: 'Kurztext', pubDate: '2012-05-10', link: 'www.seppeisl.at/'});
				this.newsCollection = new FeedItemCollection;
				this.newsCollection.add([this.news1, this.news2]);
				this.feedView.addFeedItemCollection(this.newsCollection);
	  	});

	  	afterEach(function() {
				this.news1 = null;
				this.news2 = null;
				this.newsCollection = null;
		  });

		  it('should be able to be added to collection', function(){				
				expect(this.feedView.newsCollection).toEqual(this.newsCollection);
		  });

		}); */

	});

});