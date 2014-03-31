define(["views/header","views/hotelMap"], function(headerView, hotelMapView) {
//

return function() {
  headerView.$el.find('.btn-back').show();
  headerView.hideSearch();
  headerView.setTitle(hotelMapView.title);

  hotelMapView.show();
};

//
});
