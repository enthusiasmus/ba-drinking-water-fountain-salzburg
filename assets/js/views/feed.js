var FeedView = Backbone.View.extend({
  el : $('#feed'),
  feedItemCollection : '',
  tagName : 'section',
  id : 'rss',
  initialize : function() {
  },
  timestamp : '',
  addFeedItemCollection : function(feedItemCollection) {
    this.feedItemCollection = feedItemCollection;
    this.render();
  },
  render : function() {
    _.each(this.feedItemCollection.toArray(), function(feedItemModel) {
      var completeDescription = feedItemModel.get('description');
      var shortDescription = completeDescription.substring(0, 90);
      var descriptionEnd = shortDescription.substring(60, 90);
      var endLastWord = descriptionEnd.lastIndexOf(" ");
      shortDescription = shortDescription.substring(0, 60 + endLastWord);
      shortDescription += '...';

      $('#rss').append('<article>' + '<h3 class="feed-title"><a href="' + 
      feedItemModel.escape('link') + '">' + feedItemModel.escape("title") + 
      '</a></h3>' + '<p class="feed-date">' + feedItemModel.escape("pubDate") + 
      '</p>' + '<p class="feed-content">' + feedItemModel.get('image') + 
      shortDescription + '</p>' + '<a href="' + feedItemModel.escape('link') + 
      '" class="feed-more">Mehr</a>' + '</article>');
    });
    this.scaleImages();
    
    var self = this;
    var checkState = window.setInterval(function(){
      if(self.checkLoadingImages()){
        self.scaleImages();
        window.clearInterval(checkState);
      }
    }, 300);
  },
  checkLoadingImages: function(){
    for(var i=0; i < document.images.length; i++){
      if(!document.images[i].complete)
        return false;
    }
    return true;
  },
  scaleImages: function(){
    var allFeedImages = $('#rss').find('img');
    for(idx in allFeedImages) {
      if(allFeedImages[idx].height > 120 && allFeedImages[idx]) {
        var scaleValue = allFeedImages[idx].height / 120;
        
        //important to set first th width, then the height, because
        // it's the width which gets calculated for the height
        allFeedImages[idx].width = allFeedImages[idx].width / scaleValue;
        allFeedImages[idx].height = 120;
      }
      if(allFeedImages[idx].width > 180){
        allFeedImages[idx].width = 180;
      }
    }
  }
});
