'use strict';

var App          = require('../App.js');
var menuView     = require('./menu.js');
var scheduleView = require('./schedule.js');

module.exports = new App.View({
  id: 'header',
  events: {
    'click .menu-toggle': function(e) {
      e.preventDefault();
      menuView.$el.trigger('toggle');
    },
    'click .btn-back': function(e) {
      e.preventDefault();
      window.history.back();
    },
    'keyup .search-input': function(e) {
      var text = $(e.target).val();
      if(text.length > 0) {
        scheduleView.filter(text);
      } else {
        scheduleView.clearFilter();
      }
    }
    /*
    'click .btn-search': function(e) {
      e.preventDefault();
      var $s = this.$el.find('#search');
      if($s.hasClass('open')) {
        $s.find('input').blur();
        $s.removeClass('open');
        scheduleView.clearFilter();
      } else {
        $s.find('input').focus();
        $s.addClass('open');
      }
    },
    'click #search': function(e) {
      var $i = $(e.target);
      $i.find('input').blur().focus();
    },
    */
  },
  // custom methods
  setTitle: function(title) {
    this.$el.find('h1').text(title);
  },
  toggleSearch: function(bool) {
    this.$el.find('#search').toggle(bool);
  }
});