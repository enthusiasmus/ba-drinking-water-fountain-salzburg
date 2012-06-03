describe("Model - Marker", function() {
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