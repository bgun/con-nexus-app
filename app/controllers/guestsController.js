define(["views/header","views/guests"], function(headerView, guestsView) {
//

return function() {
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(guestsView.title);

  guestsView.render(this.models.guests.data);
  guestsView.show();
};

//
});

