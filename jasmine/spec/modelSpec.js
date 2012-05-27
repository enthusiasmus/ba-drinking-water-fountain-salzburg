describe("MODELS", function() {
   
	describe("Map Model", function() {
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
				this.map = new MapModel;
		  });
		  afterEach(function() {
		  	this.map = null;
		  });

		  it("should have a center attribut with value within the country of salzburg", function() {
		    expect(this.map.get("centerLatitude")).toBeGreaterThan(46.8)
		    expect(this.map.get("centerLatitude")).toBeLessThan(48.1);
		    expect(this.map.get("centerLongitude")).toBeGreaterThan(12);
		    expect(this.map.get("centerLongitude")).toBeLessThan(14);
		  }); 	  	 	

		  it("should have a attribute zoom with default 7", function() {
		    expect(this.map.get("zoom")).toEqual(7);
		  });  	
		  
		  it("saving properties at the model should work", function(){
		  	this.map.set({centerLatitude: 47, centerLongitude: 13, zoom: 10});
		  	expect(this.map.get('centerLatitude')).toEqual(47);
		  	expect(this.map.get('centerLongitude')).toEqual(13);
		  	expect(this.map.get('zoom')).toEqual(10);
		  });
	  });
	});
	
	describe("Marker Model", function() {
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
				this.marker = new MarkerModel;
		  });
		  afterEach(function() {
		  	this.marker = null;
		  });
		  
		  it("should have a attribute title and a default image url", function() {
		    expect(this.marker.get("title")).toBeDefined();
		    expect(this.marker.get("imageUrl")).toBeDefined();
		  }); 
		  	 	
		  it("should have a attribute latitude and longitude both with default value 0", function() {
		    expect(this.marker.get("latitude")).toEqual(0);
		    expect(this.marker.get("longitude")).toEqual(0);
		  });
	  });
	});
	
	describe("UserLocation Model", function() {
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
				this.userLocation = new UserLocationModel;
		  });
		  afterEach(function() {
		  	this.userLocation = null;
		  });
		  	 	
		  it("should have default attributes", function() {
		    expect(this.userLocation.get("title")).toBeDefined();
		    expect(this.userLocation.get("latitude")).toBeGreaterThan(46);
		    expect(this.userLocation.get("latitude")).toBeLessThan(48);
		    expect(this.userLocation.get("longitude")).toBeGreaterThan(12);
		    expect(this.userLocation.get("longitude")).toBeLessThan(14);
		    expect(this.userLocation.get("initialZoom")).toBeDefined();
		    expect(this.userLocation.get("time")).toBeDefined();
		    expect(this.userLocation.get("precision")).toBeDefined();
		    expect(this.userLocation.get("altitude")).toBeDefined();
		    expect(this.userLocation.get("altitudeAcc")).toBeDefined();
		    expect(this.userLocation.get("speed")).toBeDefined();
		    expect(this.userLocation.get("heading")).toBeDefined();
		    expect(this.userLocation.get("precisionStrokeColor").split('')).toContain('#');
		    expect(this.userLocation.get("precisionStrokeOpacity")).toBeDefined();
		    expect(this.userLocation.get("precisionStrokeWeight")).toBeDefined();
		    expect(this.userLocation.get("precisionFillColor").split('')).toContain('#');
		    expect(this.userLocation.get("precisionFillOpacity")).toBeDefined();
		    expect(this.userLocation.get("imageUrl")).toBeDefined();
		    expect(this.userLocation.get("imageWidth")).toBeGreaterThan(10);
		    expect(this.userLocation.get("imageHeight")).toBeGreaterThan(10);
		    expect(this.userLocation.get("imageOriginX")).toBeDefined();
		    expect(this.userLocation.get("imageOriginY")).toBeDefined();
		    expect(this.userLocation.get("imageAnchorX")).toBeDefined();
		    expect(this.userLocation.get("imageAnchorY")).toBeDefined();
		  });
	  });
	});		

	describe('Feed Model', function() {

		describe('when instantiated', function() {

		  beforeEach(function() {
				this.feed = new FeedModel;
		  });

		  it('should exhibit attributes', function() {
		  	expect(this.feed.get('title')).toEqual('RSS Feed');
		  });

	  });

	});

	describe('Feed Item Model', function() {

		describe('when instantiated', function() {

		  beforeEach(function() {
				this.feedItem = new FeedItemModel;
		  });

		  it('should exhibit attributes', function() {
		  	expect(this.feedItem.get('title')).toEqual('');
		  	expect(this.feedItem.get('description')).toEqual('');
		  	expect(this.feedItem.get('pubDate')).toEqual('');
		  	expect(this.feedItem.get('link')).toEqual('');
		  });

	  });

	});
});