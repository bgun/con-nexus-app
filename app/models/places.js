'use strict';

var App = require('../App.js');

module.exports = new App.Model({
  parse: function(items) {
    return items;
  }
});