'use strict';

define(["views/header","views/feedback"], function(headerView, feedbackView) {
//

return function(event_id) {
  var t = this;

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(feedbackView.title);

  var ev = app.models.events.getById(event_id);

  feedbackView.render(ev);
  feedbackView.show();
};

//
});
