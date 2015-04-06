'use strict';

var headerView   = require('../views/header.js');
var hotelMapView = require('../views/hotelMap.js');

module.exports = function() {
  
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(hotelMapView.title);

  hotelMapView.show();

};