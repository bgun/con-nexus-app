define(["App"], function(App) {
//

return new App.Model({
  parse: function(items) {
    var assocItems = {};

    for(var i in items) {
      items[i].fdate = moment(items[i].datetime).format("dddd h:mm a");
      var g = items[i];
      assocItems[g.event_id] = g;
    }

    return {
      lookup: assocItems,
      sorted: this.sort(items)
    };
  },
  sort: function(items) {
    // sort by date
    return items.sort(function(a,b) {
      if(!a.datetime || !b.datetime) {
        console.log("No date in event - something is very wrong");
        return 0;
      }
      if(a.datetime > b.datetime) return 1;
      if(a.datetime < b.datetime) return -1;
      if(a.datetime === b.datetime) {
        if(a.title > b.title) return 1;
        if(a.title < b.title) return -1;
      }
      return 0;
    });
  },
  getById: function(id) {
    var t = this;
    var evt;
    // id can be a single id or an array
    if(_.isArray(id)) {
      var arr = [];
      for(var i in id) {
        evt = t.data.lookup[id[i]];
        if(evt) {
          arr.push(evt);
        }
      }
      return t.sort(arr);
    } else {
      return t.data.lookup[id];
    }
  }
});

//
});
