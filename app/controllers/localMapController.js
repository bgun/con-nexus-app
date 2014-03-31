define(["views/header","views/localMap"], function(headerView, localMapView) {
//

return function() {
  headerView.$el.find('.btn-back').show();
  headerView.hideSearch();
  headerView.setTitle(localMapView.title);

  // TODO: load places
  var markers = this.models.places.data;
  localMapView.renderMarkers(markers, this.settings.con_id);
  localMapView.show();
};

//
});
