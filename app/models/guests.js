define(["App"], function(App) {
//

return new App.Model({
  parse: function(items) {
    var t = this;
    var assocItems = {};

    for(var i in items) {
      var g = items[i];
      assocItems[g.guest_id] = g;
    }

    return {
      lookup: assocItems,
      sorted: this.sort(items)
    };
  },
  sort: function(items) {
    return items.sort(function(a,b) {
      var astr = a.first_name + ' ' + a.last_name;
      var bstr = b.first_name + ' ' + b.last_name;
      if(astr > bstr) return 1;
      if(astr < bstr) return -1;
      return 0;
    });
  },
  getById: function(id) {
    // id can be a single id or an array
    if(_.isArray(id)) {
      var arr = [];
      for(var i in id) {
        arr.push(this.data.lookup[id[i]]);
      }
      return arr;
      //return this.sort(arr);
    } else {
      return this.data.lookup[id];
    }
  }
});

//
});

