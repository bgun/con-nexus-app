'use strict';

var App = require('../App.js');

var popupOptions = {
  autoPanPadding: [10,100]
};

module.exports = new App.View({
  id: 'local-map',
  title: 'Local Map',
  init: function() {
    var t = this;
    t.map = L.map('local-map-container')
      .addLayer(L.mapbox.tileLayer('bgun.map-0xo3jced', {
        attributionControl: false,
        detectRetina: true
      }));
  },
  setView: function(center, zoom) {
    this.map.setView(center, zoom);
  },
  renderMarkers: function(places, con_id) {
    var t = this;
    var marker;
    console.log("places",places);
    _.each(places, function(m) {
      var icon = L.icon({
        iconUrl: "./assets/"+con_id+"/map_marker_"+m.icon+".png",
        iconSize: [50,63],
        iconAnchor: [25,59],
        popupAnchor: [0,-40]
      });
      console.log(m);
      marker = L.marker([m.lat, m.lon], {icon: icon});
      m.formatted_phone = m.phone ? m.phone.replace(/-/g,'') : "";
      marker.bindPopup(JST['map-popup'](m), popupOptions);
      t.map.addLayer(marker);
    });
  }
});