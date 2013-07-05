var LakeModel = Backbone.Model.extend({
  defaults: {
    id: undefined,
    city: undefined,
    lake: undefined,
    timestamp: undefined,
    value: undefined,
    latitude: undefined,
    longitude: undefined,
    imageUrl: 'assets/img/lake.png',
    shadowUrl: 'assets/img/marker-shadow.png'
  }
}); 