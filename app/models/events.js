define(["App"], function(App) {
//

return new App.Model({
  parse: function(resp) {
    var t = this;
    // todo: models!
    var schedule = [];
    var assocItems = {};
    var sortedItems = resp;

    for(i = 0; i < sortedItems.length; i++) {
      a = sortedItems[i];
      a.fdate = moment(a.datetime).format("dddd h:mm a");
      assocItems[a.event_id] = a;
      if(i === 0) {
        schedule.push({ type: "separator", fdate: moment(a.datetime).format("dddd h:mm a")});
      }
      if(i > 0 && a.datetime > sortedItems[i-1].datetime) {
        schedule.push({ type: "separator", fdate: moment(a.datetime).format("dddd h:mm a")});
      }
      schedule.push(a);
    }

    return {
      lookup: assocItems,
      sorted: sortedItems,
      withSeparators: schedule
    };
  },
  getById: function(id) {
    return this.data.lookup[id];
  }
});

//
});
