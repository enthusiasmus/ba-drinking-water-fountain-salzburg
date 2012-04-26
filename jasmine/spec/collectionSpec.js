describe("COLLECTIONS", function() {
	
	describe("Marker Collection", function() {
		
	  beforeEach(function() {
		this.markercollection = new MarkerCollection;
		this.marker = new MarkerModel;
	  });
		  
	  it("should add a model", function() {
	    this.markercollection.add([this.marker]);
	    expect(this.markercollection.length).toEqual(1);
	  });		
	});

});