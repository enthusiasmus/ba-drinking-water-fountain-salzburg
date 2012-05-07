describe("MODELS", function() {
   
	describe("Map Model", function() {
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
				this.map = new MapModel({title: "my map"});
		  });
		  it("should have a attribute name", function() {
		    expect(this.map.get("title")).toEqual("my map");
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
	  });
	});
	
	describe("Marker Model", function() {
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
				this.marker = new MarkerModel;
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
	
		  it("should have a inherited longitude, latitude and title attributes from markerModel", function() {
		    // expect(this.userLocation.get("title")).toBeDefined();
		    // expect(this.userLocation.get("latitude")).toBeDefined();
		    // expect(this.userLocation.get("longitude")).toBeDefined();
		  }); 
		  	 	
		  it("should have default attributes", function() {
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
});