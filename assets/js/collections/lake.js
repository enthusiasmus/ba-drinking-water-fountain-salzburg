var LakeCollection = Backbone.Collection.extend({
  model: LakeModel,
  timestamp: '',
  parse: function(data) {
    var lakes = new Array();
    for (idx in data) {
      var lakeModel = new LakeModel({
        id: idx,
        lake: data[idx].lake,
        city: data[idx].city,
        value: data[idx].value,
        timestamp: data[idx].timestamp
      });
      lakes.push(lakeModel);
    }
    return lakes;
  }
});
