'use strict';

var App = require('../App.js');

module.exports = new App.View({
  id: 'guest-detail',
  template: 'guest-detail',
  title: 'Guest Detail',
  render: function(item) {
    var t = this;

    t.$el.find('.page-content').html(
      t.$template(item)
    );
  }
});