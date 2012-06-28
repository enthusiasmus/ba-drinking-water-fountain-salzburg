var UserLocationModel = Backbone.Model.extend({
  defaults:{
    title: "Eigene Position",
    latitude: 47.80912,
    longitude: 13.055162,
    initialZoom: 14,
    time: 0,
    precision: 0,
    altitude: 0,
    altitudeAcc: 0,
    speed: 0,
    heading: 0,
    precisionStrokeColor: "#0000FF",
    precisionStrokeOpacity: 0.4,
    precisionStrokeWeight: 2,
    precisionFillColor: "#0000FF",
    precisionFillOpacity: 0.1,
    imageUrl: 'assets/img/userlocation.png',
    imageWidth: 25,
    imageHeight: 24,
    imageOriginX: 0,
    imageOriginY: 0,
    imageAnchorX: 12,
    imageAnchorY: 12
  },
  validate: function(attrs){
    if(attrs.precision >= 10000)
      this.precision = 0;
  }
});