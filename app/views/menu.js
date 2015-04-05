'use strict';

define(["App"],function(App) {
//

return new App.View({
  id: 'menu',
  events: {
    'click .menu-close': function(e) {
      e.preventDefault();
      this.$el.trigger('close');
    },
    'close': function() {
      this.$pageContainer.focus().removeClass('menu-open');
    },
    'toggle': function(e) {
      console.log("menu toggle");
      if(e) { e.preventDefault(); }
      if(this.$pageContainer.hasClass('menu-open')) {
        this.$el.trigger('close');
      } else {
        this.$pageContainer.addClass('menu-open');
      }
    }
  }
});

//
});
