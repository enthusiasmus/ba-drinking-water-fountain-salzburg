describe('Model - Feed', function() {

	describe('when instantiated', function() {

	  beforeEach(function() {
			this.feed = new FeedModel;
	  });

	  it('should exist and have default title', function() {
		expect(this.feed.get('title')).toEqual('RSS-Feed - Landesrat Sepp Eisl');
	  });

  });

});