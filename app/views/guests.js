define(['App'], function(App) {
//

  return new App.View({
    id: 'guests',
    title: 'Guests',
    template: 'guest-item-template',
    render: function(guests) {
      var t = this;
      console.log(guests);
      t.$el.find('#guest-list').html(
        t.$template.render(guests.sorted)
      );
    }
  });

//
});

