var MarkerModel = Backbone.Model.extend({
  defaults:{
    id: undefined,
    latitude: 0,
    longitude: 0,
    imageUrl: 'assets/img/marker.png',
    title: "Trinkbrunnen"
  }
});