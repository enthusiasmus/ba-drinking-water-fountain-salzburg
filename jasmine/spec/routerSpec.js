describe("ROUTERS", function() {
	describe('when making ajax call', function(){
	  beforeEach(function() { 	
	  	this.router = new AppRouter;
	  	this.router.markerCollection.url = '../db/elements.php';
			this.server = sinon.fakeServer.create();
	    this.server.respondWith("GET", "../db/elements.php", [200, { "Content-Type": "application/json" }, '[{"fontain_name":"Salzburg Innenstadt"}]']);
	  });
	
	  afterEach(function(){
	  	this.server.restore();
	  });
	  
	  it('should make the right ajax call when calling index', function(){
	  	this.router.index();
			expect(this.server.requests.length).toEqual(1);
			expect(this.server.requests[0].method).toEqual("GET");
			expect(this.server.requests[0].url).toEqual("../db/elements.php");
	  });
	  
		it('should parse fountain from response when index calling', function() {	  
		  this.router.index();
		  this.server.respond();
		  //expect 2 because the collection adds automatically an default marker
		  expect(this.router.markerCollection.length).toEqual(2);
		  console.log(this.router.markerCollection.at(0));
		  console.log(this.router.markerCollection.at(1));
		});
	});

	describe('when click on spezific path ->', function(){
		beforeEach(function() {
			this.router = new AppRouter;
			this.router.markerCollection.url = '../../db/elements.php';
		  	
			this.mapModel = new MapModel;
			this.mapView = new MapView({model: this.mapModel});
			
			try {
			Backbone.history.start({silent:true, pushState:true});
			} catch(e) {}
		});
		  
	  	afterEach(function() {
		  	this.mapView = null;
		  	this.mapModel = null;
		});
		  
		describe("Home-Path", function(){
		});
		  
		describe("Position-Path", function() {
	
			it("should call function getUserLocation", function() {
				spyOn(this.router, 'getUserLocation');
				this.router.getUserLocation();
				expect(this.router.getUserLocation).toHaveBeenCalled();			
			});
	
			it("should display the google map", function() {
				this.mapDiv = $('#map_canvas');
				
				expect(this.mapDiv.is(':visible')).toBeTruthy();
				expect(this.mapView.map).toBeTruthy();
			});
			
			it("should call function getLoadingView", function() {
				spyOn(this.router, 'getLoadingView');
				this.router.getLoadingView();
				expect(this.router.getLoadingView).toHaveBeenCalled();			
			});	
		});
	
		describe("Adress-Path", function() {
		
			beforeEach(function() {
				this.adressView = new AdressView;
			});
			
			it("should display the adress site", function() {
				this.adressDiv = $('#adress');
				this.router.showAdressSearch();
				expect(this.adressDiv.is(':visible')).toBeTruthy();
				expect(this.adressView).toBeTruthy();
			});
		});
	
		describe("Feed-Path", function(){
		
			beforeEach(function() {
				this.feedModel = new FeedModel;
				this.feedItemCollection = new FeedItemCollection;
				this.feedView = new FeedView;
				
				//this.router.showRssFeed();
			});
			
			/*it("should hide the google map", function() {
				this.mapDiv = $('#map_canvas');
				
				expect(this.mapDiv.is(':visible')).toBeFalsy();
			});*/
			
			it("should display the feed site", function() {
				this.feedDiv = $('#feed');
				this.router.showRssFeed();
				expect(this.feedDiv.is(':visible')).toBeTruthy();
				expect(this.feedView).toBeTruthy();
			});
			
			/*it("should call function getLoadingView", function() {
				spyOn(this.router, 'getLoadingView');
				expect(this.router.getLoadingView).toHaveBeenCalled();			
			});*/	
		});
	
		describe("Next-Fontain-Path", function(){
		
			/*beforeEach(function(){
				this.router.nextFountain();
			});	
			
			it("should display the google map", function() {
				this.mapDiv = $('#map_canvas');
				
				expect(this.mapDiv.is(':visible')).toBeTruthy();
				expect(this.mapView.map).toBeTruthy();
			});
			
			it("should call function getLoadingView", function() {
				spyOn(this.mapView, 'drawRouteUserLocationToNextFountain');
				expect(this.mapView.drawRouteUserLocationToNextFountain).toHaveBeenCalled();			
			});*/
		});
	
		describe("Maptype-Path", function(){
		
			beforeEach(function() {
				this.maptypeView = new MaptypeView;
				this.router.showMaptype();
			});
			
			it("should display the google map", function() {
				this.mapDiv = $('#map_canvas');
				
				expect(this.mapDiv.is(':visible')).toBeTruthy();
				expect(this.mapView.map).toBeTruthy();
			});
			
			it("should display the Maptype-View", function() {
				this.maptypeDiv = $('#maptype');
				
				expect(this.maptypeDiv.is(':visible')).toBeTruthy();
				expect(this.maptypeView).toBeTruthy();
			});
		});
		
		describe("Info-Path", function(){
		
			beforeEach(function() {
				this.infoView = new InfoView;
				this.router.showAbout();
			});
			
			it("should hide the google map", function() {
				this.mapDiv = $('#map_canvas');
				
				expect(this.mapDiv.is(':visible')).toBeFalsy();
			});
			
			it("should display the Info-View", function() {
				this.infoDiv = $('#info');
				
				expect(this.infoDiv.is(':visible')).toBeTruthy();
				expect(this.infoView).toBeTruthy();
			});
		});
	});
});