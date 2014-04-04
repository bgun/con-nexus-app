define(["views/header","views/schedule","views/eventDetail"], function(headerView, scheduleView, eventDetailView) {
//

return function(id) {
  var t = this;
  var item = t.models.events.getById(id);

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

//
});
