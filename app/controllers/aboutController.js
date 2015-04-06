'use strict';

var headerView   = require('../views/header.js');
var scheduleView = require('../views/schedule.js');
var aboutView    = require('../views/about.js');

module.exports = function() {
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(aboutView.title);

  scheduleView.clearFilter();
  aboutView.show();
};