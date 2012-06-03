describe('Collection - Feeditems ', function() {
	beforeEach(function() {
		this.feedItemCollection = new FeedItemCollection();
		this.feedItem = new FeedItemModel();
	});
  afterEach(function(){
  	this.feedItemCollection = null;
  	this.feedItem = null;
  });

	it('should push a feed item', function() {
		this.feedItemCollection.push([this.feedItem]);
		expect(this.feedItemCollection.length).toEqual(1);
	});
});