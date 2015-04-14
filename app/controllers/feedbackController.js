'use strict';

var headerView   = require('../views/header.js');
var feedbackView = require('../views/feedback.js');

module.exports = function(event_id) {
  
  var t = this;
  var subject = "JordanCon";
  var ev;

  headerView.$el.find('.btn-back').show();
  headerView.toggleSearch(false);
  headerView.setTitle(feedbackView.title);


  if(event_id) {
    subject = app.models.events.getById(event_id).title;
  }

  feedbackView.render(subject);
  feedbackView.show();

};