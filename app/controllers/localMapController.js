'use strict';

define(["views/header","views/localMap"], function(headerView, localMapView) {
//

return function() {
  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(localMapView.title);

  // TODO: load places
  var markers = this.models.places.data;
  localMapView.renderMarkers(markers, this.settings.con_id);
  localMapView.show();
};

//
});
