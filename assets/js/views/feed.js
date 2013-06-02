var FeedView = Backbone.View.extend({
  el: $('#feed'),
  feedItemCollection: '',
  timestamp: '',
  tagName: 'section',
  id: 'rss',
  initialize: function() {
  },
  addFeedItemCollection: function(feedItemCollection) {
    this.feedItemCollection = feedItemCollection;
    this.timestamp = new Date().getTime();
    this.render();
  },
  render: function() {
    this.reset();

    if (this.isIpad()) {
      var length = 300;
    } else {
      var length = 90;
    }

    var potentialEnd = length - 40;
    var searchEnd = length - potentialEnd;
    _.each(this.feedItemCollection.toArray(), function(feedItemModel) {
      var completeDescription = feedItemModel.get('description');
      var shortDescription = completeDescription.substring(0, length);
      var descriptionEnd = shortDescription.substring(potentialEnd, length);
      var endLastWord = descriptionEnd.lastIndexOf(" ");
      shortDescription = shortDescription.substring(0, potentialEnd + endLastWord);
      shortDescription += '...';

      $('#rss').append('<article>' + '<h3 class="feed-title"><a href="' + feedItemModel.escape('link') + '">' + feedItemModel.escape("title") + '</a></h3>' + '<p class="feed-date">' + feedItemModel.escape("pubDate") + '</p>' + '<p class="feed-content">' + feedItemModel.get('image') + shortDescription + '</p>' + '<a target="_blank" href="' + feedItemModel.escape('link') + '" class="feed-more">Mehr</a>' + '</article>');
    });
    this.scaleImages();

    var self = this;
    var checkState = window.setInterval(function() {
      if (self.checkLoadingImages()) {
        self.scaleImages();
        window.clearInterval(checkState);
      } else {
        self.scaleImages();
      }
    }, 300);
  },
  checkLoadingImages: function() {
    for (var i = 0; i < document.images.length; i++) {
      if (!document.images[i].complete)
        return false;
    }
    return true;
  },
  scaleImages: function() {
    var allFeedImages = $('#rss').find('img');
    var limit = (window.Trinkbrunnen.isMobile() === true || this.isIpad() === true) ? 100 : 120;

    for (idx in allFeedImages) {
      if (allFeedImages[idx].height > limit && allFeedImages[idx]) {
        var scaleValue = allFeedImages[idx].height / limit;

        //important to set first th width, then the height, because
        // it's the width which gets calculated for the height
        allFeedImages[idx].width = allFeedImages[idx].width / scaleValue;
        allFeedImages[idx].height = limit;
      }
      if (allFeedImages[idx].width > 180) {
        allFeedImages[idx].width = 180;
      }
    }
  },
  isIpad: function() {
    return (navigator.userAgent.match(/iPad/i) != null);
  },
  reset: function() {
    $('#rss').html("");
  }
});
