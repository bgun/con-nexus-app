'use strict';

var headerView      = require('../views/header.js');
var scheduleView    = require('../views/schedule.js');
var eventDetailView = require('../views/eventDetail.js');

module.exports = function(id) {
  
  var t = this;
  var item = t.models.events.getById(id);

  if(!item.guest_list_objects) {
    item.guest_list_objects = _(item.guest_list)
      //.compact()
      .map(function(guest) {
        return t.models.guests.getById(guest.guest_id);
      })
      .sortBy("name")
      .value();
  }

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(eventDetailView.title);

  scheduleView.clearFilter();

  eventDetailView.render(_.extend(item, {
    inTodo: t.models.todo.hasItem(id)
  }));

  eventDetailView.$el.off('add-todo').on('add-todo',function(e, id) {
    t.models.todo.addTodo(id);
  });
  eventDetailView.$el.off('remove-todo').on('remove-todo',function(e, id) {
    t.models.todo.removeTodo(id);
  });
  eventDetailView.show();

};