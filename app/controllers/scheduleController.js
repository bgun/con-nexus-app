define(["views/header", "views/schedule"], function(headerView, scheduleView) {
//

  return function() {
    headerView.$el.find('.btn-back').hide();
    headerView.$el.find('.btn-search').show();
    headerView.setTitle(scheduleView.title);

    var model = this.models.events;
    scheduleView.render(model);
    scheduleView.show();
  };

//
});