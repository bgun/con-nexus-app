define(["App"],function(App) {
//

return new App.View({
  id: 'menu',
  events: {
    'click .menu-close': function(e) {
      e.preventDefault();
      console.log("menu click close");
      this.$el.trigger('close');
    },
    'close': function() {
      console.log("menu close");
      this.$pageContainer.removeClass('menu-open');
    },
    'toggle': function(e) {
      console.log("menu toggle");
      if(e) { e.preventDefault(); }
      this.$pageContainer.toggleClass('menu-open');
    }
  }
});

//
});
