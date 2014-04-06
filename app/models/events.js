define(["App"], function(App) {
//

return new App.Model({
  parse: function(items) {
    for(var i in items) {
      items[i].fdate = moment(items[i].datetime).format("dddd h:mm a");
    }
    return items;
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
      return 0;
    });
  },
  lookupById: function(id) {
    for(var i in this.data) {
      if(this.data[i].event_id === id) {
        return this.data[i];
      }
    }
    console.log("Event lookup failed (\""+id+"\"). ID may have been deleted");
  },
  getById: function(id) {
    var t = this;
    var evt;
    // id can be a single id or an array
    if(_.isArray(id)) {
      var arr = [];
      for(var i in id) {
        evt = t.lookupById(id[i]);
        if(evt) {
          arr.push(evt);
        }
      }
      return t.sort(arr);
    } else {
      return t.lookupById(id);
    }
  }
});

//
});
