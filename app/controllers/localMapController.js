'use strict';

var headerView   = require('../views/header.js');
var localMapView = require('../views/localMap.js');

module.exports = function() {
  
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(localMapView.title);

  // TODO: load places
  var markers = this.models.places.data;
  console.log("places",markers);
  localMapView.renderMarkers(markers, this.settings.con_id);
  localMapView.show();

};