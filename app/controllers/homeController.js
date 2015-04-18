'use strict';

var headerView = require('../views/header.js');
var homeView   = require('../views/home.js');

module.exports = function() {

  var app = this;

  headerView.$el.find('.btn-back').hide();
  headerView.toggleSearch(false);
  headerView.setTitle(homeView.title);

  var todoArray = this.models.todo.data;
  var todoItems = _(todoArray)
    .map(function(event_id) {
      return app.models.events.getById(event_id);
    })
    .sortBy("datetime")
    .value();
  homeView.renderTodo(todoItems);
  homeView.show();

};