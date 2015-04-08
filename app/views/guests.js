'use strict';

var App = require('../App.js');

module.exports = new App.View({
  id: 'guests',
  title: 'Guests',
  template: 'guest-item',
  render: function(guests) {
    var t = this;
    t.$el.find('#guests-all').html(
      _.map(guests, function(g) {
        return t.$template(g);
      }).join('')
    );
  }
});