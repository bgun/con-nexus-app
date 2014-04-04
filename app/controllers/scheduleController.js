define(["views/header", "views/schedule"], function(headerView, scheduleView) {
//

  return function() {
    headerView.$el.find('.btn-back').show();
    headerView.$el.find('.btn-search').show();
    headerView.toggleSearch(true);
    headerView.setTitle(scheduleView.title);

    var model = this.models.events;
    var todo  = this.models.todo;
    scheduleView.render(model, todo);
    scheduleView.show();
  };

//
});
