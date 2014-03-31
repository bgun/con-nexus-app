define(["App","jsrender"], function(App,jsrender) {
//

return new App.View({
  id: 'guest-detail',
  template: 'guest-detail-template',
  title: 'Guest Detail',
  render: function(item) {
    var t = this;
    _.each(item.event_list, function(ev) {
      if(ev.datetime) {
        ev.fdate = moment(ev.datetime).format("dddd h:mm a");
      } else {
        console.log("no datetime for ",ev);
      }
    });
    t.$el.find('.page-content').html(
      t.$template.render(item)
    );
  }
});

//
});
