define(["views/header","views/feedback"], function(headerView, feedbackView) {
//

return function(subject) {
  var t = this;

  headerView.$el.find('.btn-back').show();
  headerView.hideSearch();
  headerView.setTitle(feedbackView.title);

  feedbackView.render(subject);
  feedbackView.show();
};

//
});
