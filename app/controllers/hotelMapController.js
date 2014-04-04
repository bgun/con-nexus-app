define(["views/header","views/hotelMap"], function(headerView, hotelMapView) {
//

return function() {
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(hotelMapView.title);

  hotelMapView.show();
};

//
});
