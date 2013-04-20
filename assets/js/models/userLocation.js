var UserLocationModel = Backbone.Model.extend({
  defaults: {
    title: "Eigene Position",
    latitude: 47.809494,
    longitude: 13.055019,
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
    imageWidth: 28,
    imageHeight: 28,
    imageActiveOriginX: 0,
    imageActiveOriginY: 0,
    imageInactiveOriginX: 28,
    imageInactiveOriginY: 0,
    imageAnchorX: 14,
    imageAnchorY: 14,
    timestampAttributes: new Date().getTime()
  },
  validate: function(attrs) {
    if (attrs.precision >= 10000)
      this.precision = 0;
  }
});
