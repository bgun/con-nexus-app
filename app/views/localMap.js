define(["App", "mapbox", "jsrender"], function(App, mapbox, jsrender) {
//

return new App.View({
  id: 'local-map',
  title: 'Local Map',
  init: function() {
    var t = this;
    t.map = L.mapbox.map('local-map-container', 'bgun.map-0xo3jced',{
      attributionControl: false,
      detectRetina: true,
      retinaVersion: 'bgun.map-0xo3jced'
    }).setView([34.02183,-84.32968],16);
  },
  renderMarkers: function(places) {
    var t = this;
    places = [
      {
        lon: 34.0221599,
        lat: -84.330078,
        name: "DoubleTree by Hilton Atlanta-Roswell",
        address: "1075 Holcomb Bridge Road<br />Roswell, Georgia, 30076",
        phone: "770-992-9600"
      }
    ];
    var marker;
    var markerIcon = L.icon({
      iconUrl: "./assets/images/map-marker.png",
      iconSize: [33,48],
      iconAnchor: [16,48],
      popupAnchor: [0,-32]
    });
    _.each(places, function(l) {
      console.log(l);
      marker = L.marker([l.lon, l.lat], {icon: markerIcon});
      marker.bindPopup($('#map-popup-template').render(l));
      t.map.addLayer(marker);
    });
  }
});

//
});
