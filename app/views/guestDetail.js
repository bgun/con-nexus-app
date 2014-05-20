define(["App","jsrender"], function(App,jsrender) {
//

return new App.View({
  id: 'guest-detail',
  template: 'guest-detail-template',
  title: 'Guest Detail',
  render: function(item) {
    var t = this;

    t.$el.find('.page-content').html(
      t.$template.render(item)
    );
  }
});

//
});
