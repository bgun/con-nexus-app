define(["App"], function(App) {
//

return new App.Model({
  parse: function(items) {
    for(var i in items) {
      items[i].fdate = moment(items[i].datetime).format("dddd h:mm a");
    }
    return items;
  },
  addSeparators: function(items) {
    var arr = [];
    items = this.sort(items);
    for(var i in items) {
      if(i === 0 || (i > 0 && items[i].datetime > items[i-1].datetime)) {
        arr.push({ type: "separator", datetime: items[i].datetime, fdate: moment(items[i].datetime).format("dddd h:mm a")});
      }
      arr.push(items[i]);
    }
    return arr;
  },
  sort: function(items) {
    // sort by date
    return items.sort(function(a,b) {
      if(!a.datetime || !b.datetime) {
        throw new Error("no date in event - something is very wrong");
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
    console.log("ERROR: event lookup failed. Why wasn't the ID found?");
  },
  getById: function(id) {
    var t = this;
    // id can be a single id or an array
    if(_.isArray(id)) {
      var arr = [];
      for(var i in id) {
        arr.push(t.lookupById(id[i]));
      }
      return t.sort(arr);
    } else {
      return t.lookupById(id);
    }
  }
});

//
});
