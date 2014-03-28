define(["views/header","views/localMap"], function(headerView, localMapView) {
//

return function() {
  headerView.$el.find('.btn-back').hide();
  headerView.hideSearch();

  // TODO: load places
  //var model = this.models.locations;
  localMapView.renderMarkers([]);
  localMapView.show();
};

//
});
