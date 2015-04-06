'use strict';

var App = require('../App.js');

module.exports = new App.View({
  id: 'home',
  title: 'Home',
  template: 'schedule-item', // for todo list
  renderTodo: function(items) {
    var t = this;
    var $todo = t.$el.find('#todo-list');
    var $empty = t.$el.find('#todo-empty');
    var $todoTitle = t.$el.find('#todo-list-title');
    if(items && items.length) {
      $empty.hide();
    } else {
      $empty.show();
    }
    $todo.html(_.map(items, function(i) {
      return t.$template(i);
    }).join(''));
  }
});