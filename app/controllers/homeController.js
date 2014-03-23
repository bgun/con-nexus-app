define(["views/header","views/home"], function(headerView, homeView) {
//

  return function() {
    headerView.$el.find('.btn-back').hide();
    headerView.setTitle(homeView.title);
    homeView.show();
  };

});
