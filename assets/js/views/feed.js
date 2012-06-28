var FeedView = Backbone.View.extend({
  el: $('#feed'),
  feedItemCollection: '',
  tagName: 'section',
  id: 'rss',
  initialize: function() {
  },
  timestamp: '',
  addFeedItemCollection: function(feedItemCollection) {
    this.feedItemCollection = feedItemCollection;
    this.render();
  },
  render: function(){
    _.each(this.feedItemCollection.toArray(), function(feedItemModel) {
      var shortDescription = feedItemModel.get('description').substring(0, 100);
      descriptionEnd = shortDescription.substr(60, 40);
      var endLastWord = descriptionEnd.lastIndexOf(" ");
      shortDescription = shortDescription.substr(0, 60+endLastWord);
      shortDescription += '...';
      
      $('#rss').append(
        '<article>' +
        '<h3 class="feed-title"><a href="' + feedItemModel.escape('link') + '">' + feedItemModel.escape("title") + '</a></h3>' + 
        '<p class="feed-date">' + feedItemModel.escape("pubDate") + '</p>' + 
        '<p class="feed-content">' + feedItemModel.get('image') + shortDescription + '</p>' +
        '<a href="' + feedItemModel.escape('link') + '" class="feed-more">Mehr</a>' +
        '</article>'
      );
    });
    
    var allFeedImages = $('#rss').find('img');
    for(idx in allFeedImages) {
      if ( (allFeedImages[idx].height > 120) && (allFeedImages[idx]) ) {
        var scaleValue = 120 / allFeedImages[idx].height;
        allFeedImages[idx].height = 120;
        allFeedImages[idx].width = allFeedImages[idx].width * scaleValue;
      }
    }
  }
});