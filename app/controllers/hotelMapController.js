define(["views/header","views/hotelMap"], function(headerView, hotelMapView) {
//

return function() {
  headerView.$el.find('.btn-back').hide();
  headerView.hideSearch();
  hotelMapView.show();
};

//
});
