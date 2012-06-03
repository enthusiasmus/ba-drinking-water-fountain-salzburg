describe('Model - Feed Item', function() {

	describe('when instantiated', function() {

	  beforeEach(function() {
			this.feedItem = new FeedItemModel;
	  });

	  it('should exist and have default attributes', function() {
		expect(this.feedItem.get('title')).toEqual('Wasser für das Salzburger Land');
		expect(this.feedItem.get('description')).toEqual('-');
		expect(this.feedItem.get('pubDate')).toEqual(new Date().getDate());
		expect(this.feedItem.get('link')).toEqual('http://www.seppeisl.at');
	  });

  });

});