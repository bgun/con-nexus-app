define(["views/header","views/guestDetail"], function(headerView, guestDetailView) {
//

return function(id) {
  var t = this;
  var item = t.models.guests.getById(id);

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(guestDetailView.title);

  guestDetailView.render(item);
  guestDetailView.show();
};

//
});
