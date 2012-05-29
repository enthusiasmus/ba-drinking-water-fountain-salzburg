describe("ROUTERS", function() {
  beforeEach(function() { 	
  	this.router = new AppRouter;
		this.server = sinon.fakeServer.create();
    this.server.respondWith("GET", "db/elements.php", [200, { "Content-Type": "application/json" }, '[{ "id":1, "title":"Salzburg Innenstadt"}]']);
  });

  afterEach(function(){
  	this.server.restore();
  });
  
  it('should make the right ajax call when calling index', function(){
  	this.router.index();
		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("GET");
		expect(this.server.requests[0].url).toEqual("db/elements.php");
  });
  
	it('should parse fountain from response when index calling', function() {
	  this.router.index();
	  this.server.respond();
	  expect(this.router.mapView.markerCollection.length).toEqual(1);
	});
});
