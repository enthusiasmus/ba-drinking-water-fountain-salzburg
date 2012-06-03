describe('View - Feed', function() {

	beforeEach(function() {
	this.feedModel = new FeedModel;
		this.feedView = new FeedView({model: this.feedModel});
  });

  afterEach(function() {
	this.feedView = null;
	this.feedModel = null;
  });

	it('should have el named feed', function(){
		expect(this.feedView.$el.selector.split('#')[1]).toEqual('feed');
  });

	it('should call render-Method when feedItemCollection is added', function() {
	spyOn(this.feedView, 'render');
	this.feedView.addFeedItemCollection();
	expect(this.feedView.render).toHaveBeenCalled();
  });

  it('should fire an event loadindFinished when calling dispatchLoadingFinished', function(){
		spyOn(document, 'dispatchEvent');
	this.feedView.dispatchLoadingFinished();
	expect(document.dispatchEvent).toHaveBeenCalled();
  });

  describe('FeedItems', function(){

	beforeEach(function(){
			this.news1 = new FeedItemModel({title: 'News 1', description: 'Kurztext', pubDate: '2012-05-28', link: 'www.seppeisl.at/'});
			this.news2 = new FeedItemModel({title: 'News 2', description: 'Kurztext', pubDate: '2012-05-10', link: 'www.seppeisl.at/'});
			this.newsCollection = new FeedItemCollection;
			this.newsCollection.add([this.news1, this.news2], []);
			this.feedView.addFeedItemCollection(this.newsCollection);
	});

	afterEach(function(){
			this.news1 = null;
			this.news2 = null;
			this.feedItemCollection = null;
	  });

	  it('should be able to be added to collection', function(){				
			expect(this.feedView.feedItemCollection).toEqual(this.newsCollection);
	  });

	});
});