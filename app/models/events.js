'use strict';

var App = require('../App.js');
var moment = require('moment');

var defaults = {
  title: "",
  room: "",
  todo: false,
  past: false
};

module.exports = new App.Model({
  parse: function(items) {
    items = _.map(items, function(i) {
      return _.extend({
        fdate : moment(i.datetime).format("dddd h:mm a"),
        type  : "event"
      }, defaults, i);
    });

    return this.sort(items);
  },
  sort: function(items) {
    // sort by date
    return items.sort(function(a,b) {
      if(!a.datetime || !b.datetime) {
        console.log("No date in event - something is very wrong");
        return 0;
      }
      if(a.datetime > b.datetime) return 1;
      if(a.datetime < b.datetime) return -1;
      if(a.datetime === b.datetime) {
        if(a.title > b.title) return 1;
        if(a.title < b.title) return -1;
      }
      return 0;
    });
  },
  getById: function(id) {
    return _.findWhere(this.data, { event_id: id });
  }

});