define(["views/header","views/schedule","views/eventDetail"], function(headerView, scheduleView, eventDetailView) {
//

return function() {
  eventDetail.render(t.models.events, id);
  headerView.$el.find('.btn-back').show();
  headerView.hideSearch();
  scheduleView.clearFilter();
  eventDetailView.show();
};

//
});
