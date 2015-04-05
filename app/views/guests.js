'use strict';

define(['App'], function(App) {
//

  return new App.View({
    id: 'guests',
    title: 'Guests',
    template: 'guest-item-template',
    render: function(guests) {
      var t = this;
      t.$el.find('#guests-all').html(
        t.$template.render(guests.sorted)
      );
    }
  });

//
});

