var FeedItemCollection = Backbone.Collection.extend({
  model: FeedItemModel,
  parse: function(data){
    var feedItems = new Array();

    for(idx in data){
      var feedItemModel = new FeedItemModel({
        title: data[idx].title, 
        link: data[idx].link,
        pubDate: $.format.date(data[idx].pubDate, 'dd. MMMM yyyy HH:mm:ss'),
        description: data[idx].description
      });
      feedItems.push(feedItemModel);
    }
    return feedItems;
  }
});