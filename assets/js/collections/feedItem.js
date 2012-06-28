var FeedItemCollection = Backbone.Collection.extend({
  model: FeedItemModel,
  parse: function(data){
    var feedItems = new Array();
   
    for(idx in data){

      var description = data[idx].description;
      var image = "";
      if(description[0] == "<"){
        var lastImageLetter = description.indexOf(">");
        image = description.slice(0, lastImageLetter);
        description = description.replace(image, "");
      }
      
      if(description.indexOf("(") && description.indexOf(")")){
        var firstDateLetter = description.indexOf("(");
        var lastDateLetter = description.indexOf(")");
        
        if(description[lastDateLetter+1] = " ")
          var replacePart = description.slice(firstDateLetter, lastDateLetter+1);
        else
          var replacePart = description.slice(firstDateLetter, lastDateLetter);
          
        description = description.replace(replacePart, "");
      }
 
      var feedItemModel = new FeedItemModel({
        title: data[idx].title, 
        link: data[idx].link,
        pubDate: $.format.date(data[idx].pubDate, 'dd. MMMM yyyy'),
        image: image,
        description: description
      });
      feedItems.push(feedItemModel);
    }
    return feedItems;
  }
});