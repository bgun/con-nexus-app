'use strict';

var headerView      = require('../views/header.js');
var guestDetailView = require('../views/guestDetail.js');
var moment          = require('moment');

module.exports = function(id) {
  
  var t = this;
  var item = t.models.guests.getById(id);

  if(!item.event_list_objects) {
    item.event_list_objects = _.sortBy(_.map(item.event_list, function(event_id) {
      var ev = t.models.events.getById(event_id);
      return _.extend(ev, {
        fdate: moment(ev.datetime).format("dddd h:mm a")
      });
    }), "datetime");
  }

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(guestDetailView.title);

  guestDetailView.render(item);
  guestDetailView.show();

};