var FeedView = Backbone.View.extend({
  el: $("#feed"),
  feedItemCollection: "",
  initialize: function() {
  },
  timestamp: '',
  addFeedItemCollection: function(feedItemCollection) {
    this.feedItemCollection = feedItemCollection;
    this.render();
  },
  render: function() {
    var template = _.template( $('#feed_template').html());
    $(this.el).html(template);

    _.each(this.feedItemCollection.toArray(), function(feedItem) {
      $('#rss').append(
        '<article>' + 
        '<h3 class="feed-title"><a href="' + feedItem.get('link') + '">' + feedItem.get('title') + '</a></h3>' + 
        '<p class="feed-date">' + feedItem.get('pubDate') + '</p>' + 
        '<div class="feed-content">' + feedItem.get('description') + '</div>' +
        '</article>'
      );
    });
    
    var allFeedImages = document.getElementsByTagName('img')
    for(idx in allFeedImages){
      if(allFeedImages[idx].width > 150){
        var scaleValue = 150/allFeedImages[idx].width;
        allFeedImages[idx].width = 150;
        allFeedImages[idx].height = allFeedImages[idx].height*scaleValue;
      }
    }
    
    this.dispatchLoadingFinished();
  },
  dispatchLoadingFinished: function(){
    var event = document.createEvent('Event');
    event.initEvent('loadingFinish', true, true)
    document.dispatchEvent(event);
  },
});