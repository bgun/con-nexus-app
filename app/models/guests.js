'use strict';

var App = require('../App.js');

var defaults = {
  image: "",
  bio: ""
};

module.exports = new App.Model({
  parse: function(items) {
    items = _.map(items, function(i) {
      return _.extend({
      }, defaults, i);
    });

    return this.sort(items);
  },
  sort: function(items) {
    return items.sort(function(a,b) {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    });
  },
  getById: function(id) {
    var guest = _.findWhere(this.data, { guest_id: id });
    if(!guest) {
      throw new Error("Could not find guest: ",id)
    }
    return guest;
  }
});