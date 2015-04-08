'use strict';

var headerView      = require('../views/header.js');
var guestDetailView = require('../views/guestDetail.js');
var moment          = require('moment');

module.exports = function(id) {
  
  var t = this;
  var item = t.models.guests.getById(id);

  if(!item.event_list_objects) {
    item.event_list_objects = _(item.event_list)
      .filter(function(i) { return typeof i === "object"; })
      .map(function(event) {
        var ev = t.models.events.getById(event.event_id);
        console.log(ev);
        return _.extend(ev, {
          fdate: moment(ev.datetime).format("dddd h:mm a")
        });
      })
      .sortBy("datetime")
      .value();
  }

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(guestDetailView.title);

  guestDetailView.render(item);
  guestDetailView.show();

};