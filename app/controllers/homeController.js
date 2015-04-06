'use strict';

var headerView = require('../views/header.js');
var homeView   = require('../views/home.js');

module.exports = function() {
  
  headerView.$el.find('.btn-back').hide();
  headerView.toggleSearch(false);
  headerView.setTitle(homeView.title);

  var todoArray = this.models.todo.data;
  var todoItems = this.models.events.getById(todoArray);
  homeView.renderTodo(todoItems);
  homeView.show();

};