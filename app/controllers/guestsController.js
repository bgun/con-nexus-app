'use strict';

var headerView = require('../views/header.js');
var guestsView = require('../views/guests');

module.exports = function() {

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(guestsView.title);

  guestsView.render(this.models.guests.data);
  guestsView.show();

};