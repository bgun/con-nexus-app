define(["views/header","views/schedule","views/about"], function(headerView, scheduleView, aboutView) {
//

return function() {
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(aboutView.title);

  scheduleView.clearFilter();
  aboutView.show();
};

//
});
