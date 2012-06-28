var FeedItemModel = Backbone.Model.extend({
	defaults: {
		title: 'Wasser für das Salzburger Land',
		description: '-',
		pubDate: new Date().getDate(),
		image: '<img src=""/>',
		link: 'http://www.seppeisl.at'
	}
});