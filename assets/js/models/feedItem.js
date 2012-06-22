var FeedItemModel = Backbone.Model.extend({
	defaults: {
		title: 'Wasser für das Salzburger Land',
		description: '-',
		pubDate: new Date().getDate(),
		link: 'http://www.seppeisl.at'
	}
});