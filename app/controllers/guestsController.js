define(["views/header","views/guests"], function(headerView, guestsView) {
//

return function() {
  headerView.$el.find('.btn-back').hide();
  headerView.hideSearch();
  headerView.setTitle(guestsView.title);

  guestsView.render(this.models.guests.data);
  guestsView.show();
};

//
});
