describe("MODELS", function() {
   
	describe("Map Model", function() {
	  
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
			this.map = new MapModel({name: "my map"});
		  });
	
		  it("should have a attribute name", function() {
		    expect(this.map.get("name")).toEqual("my map");
		  }); 
		  	 	
	  });
	   
	});
	
	describe("Marker Model", function() {
	  
	  describe("when it is instantiated", function() {
		  beforeEach(function() {
			this.marker = new MarkerModel({name: "my marker"});
		  });
	
		  it("should have a attribute name", function() {
		    expect(this.marker.get("name")).toEqual("my marker");
		  }); 
		  	 	
		  it("should have a attribute latitude with default value 0", function() {
		    expect(this.marker.get("latitude")).toEqual(0);
		  }); 	  	 	
	
		  it("should have a attribute longitude with default value 0", function() {
		    expect(this.marker.get("longitude")).toEqual(0);
		  }); 
	
	  });
	   
	});

});