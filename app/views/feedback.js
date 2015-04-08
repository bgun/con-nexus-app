'use strict';

var App = require('../App.js');

module.exports = new App.View({
  id: 'feedback',
  title: 'Feedback',
  events: {
    'submit #feedback-form': function(e) {
      e.preventDefault();
      var data = {
        subject: this.$el.find('#feedback-subject').text(),
        text:    this.$el.find('#feedback-text').val()
      };
      $.ajax({
        url: app.settings.api_url+"/feedback",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(resp) {
          if(resp.code === 0) {
            app.toast("Thank you for your feedback!");
            window.history.back();
          }
        },
        error: function() {
          console.log("Error submitting feedback");
        }
      });
    }
  },
  render: function(ev) {
    var title = "JordanCon";
    if(ev) title = ev.title;
    this.$el.find('#feedback-text').val('');
    this.$el.find('#feedback-subject').text(title);
  }
});