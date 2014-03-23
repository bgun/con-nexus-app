define(["views/header","views/localMap"], function(headerView, localMapView) {
//

return function() {
  headerView.$el.find('.btn-back').hide();
  headerView.hideSearch();
  localMapView.show();
};

//
});
