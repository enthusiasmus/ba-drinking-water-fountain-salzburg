describe("Model - Map", function() {
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