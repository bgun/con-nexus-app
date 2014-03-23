define(["views/header", "views/schedule"], function(headerView, scheduleView) {
//

  return function() {
    headerView.$el.find('.btn-back').hide();
    headerView.$el.find('.btn-search').show();

    var eventData = JSON.parse(localStorage.getItem("events"));
    scheduleView.render(eventData);
    scheduleView.show();
  };

//
});
