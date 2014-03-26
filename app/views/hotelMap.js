define(["App", "mapbox"], function(App, mapbox) {
//

return new App.View({
  id: 'hotel-map',
  title: 'Hotel Map',
  init: function() {
    this.map = L.map('hotel-map-container', {
      attributionControl: false,
      minZoom: 15,
      maxZoom: 18
    }).setView([0,0],16);
    // hotel map
    var hotelMapUrl = "/assets/jcon2014/2014HotelMap_web.jpg";
    var hotelMapBounds = [[-0.006,-0.01],[0.006,0.01]];
    L.imageOverlay(hotelMapUrl, hotelMapBounds).addTo(this.map);
  }
});

});