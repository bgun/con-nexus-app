'use strict';

var App = require('../App.js');

module.exports = new App.Model({

  url: "{api_url}/con/{con_id}",
  getLocal: function() {
  },
  saveLocal: function(data) {
  },
  getBasic: function(options) {
    var params = options.params;
    var t = this;
    if(!t.url) {
      throw new error("Can't load without a URL");
    }
    var url = t.url;
    for(var p in params) {
      var token = '{'+p+'}';
      if(url.indexOf(token) > -1) {
        url = url.replace(token, params[p]);
      }
    }
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: { basic: 1 },
      success: options.success,
      error: options.error
    });
  }

});