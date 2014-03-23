define(["App"], function(App) {
//

return new App.View({
  id: 'event-detail',
  template: 'event-detail-template',
  title: 'Event Detail',
  // custom methods
  render: function(model, id) {
    var t = this;
    t.$el.find('.page-content').html(
      t.$template.render(model.data.lookup[id])
    );
  }
});

//
});
