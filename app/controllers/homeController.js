define(["views/header","views/home"], function(headerView, homeView) {
//

  return function() {
    headerView.$el.find('.btn-back').hide();
    headerView.hideSearch();
    headerView.setTitle(homeView.title);
    homeView.show();
  };

});
