describe("Model - Userlocation", function() {
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
