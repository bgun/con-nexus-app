define(["App","jsrender"], function(App,jsrender) {
//

return new App.View({
  id: 'guest-detail',
  template: 'guest-detail-template',
  title: 'Guest Detail',
  render: function(item) {
    var t = this;
    item.event_list = _.chain(item.event_list).map(function(ev) {
      if(ev.datetime) {
        ev.fdate = moment(ev.datetime).format("dddd h:mm a");
      } else {
        console.warn("no datetime for ",ev);
      }
      return ev;
    }).sortBy("datetime").value();

    t.$el.find('.page-content').html(
      t.$template.render(item)
    );
  }
});

//
});
