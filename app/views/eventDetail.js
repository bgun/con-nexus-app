'use strict';

var App = require('../App.js');
var feedbackController = require('../controllers/feedbackController.js');

module.exports = new App.View({
  id: 'event-detail',
  template: 'event-detail',
  title: 'Event Detail',
  // custom methods
  render: function(item) {
    this.event_title = item.title;

    var t = this;
    t.$el.find('.page-content').html(
      t.$template(item)
    );

    $addTodo = t.$el.find('.add-todo');
    $remTodo = t.$el.find('.remove-todo');

    $addTodo.off().on('click',function(e) {
      var $target = $(e.target);
      var eventId = $target.attr('data-event-id');
      t.$el.trigger('add-todo',eventId);

      $addTodo.hide();
      $remTodo.show();
    });

    $remTodo.off().on('click',function(e) {
      var $target = $(e.target);
      var eventId = $target.attr('data-event-id');
      t.$el.trigger('remove-todo',eventId);

      $remTodo.hide();
      $addTodo.show();
    });
  }
});