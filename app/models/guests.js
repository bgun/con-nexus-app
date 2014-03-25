define(["App"], function(App) {
//

return new App.Model({
  parse: function(resp) {
    var t = this;
    var assocItems = {};

    for(var i in resp) {
      var g = resp[i];
      assocItems[g.guest_id] = g;
    }

    return {
      lookup: assocItems,
      sorted: resp.sort(function(a,b) {
        var astr = a.first_name + ' ' + a.last_name;
        var bstr = b.first_name + ' ' + b.last_name;
        if(astr > bstr) return 1;
        if(astr < bstr) return -1;
        return 0;
      })
    };
  },
  getById: function(id) {
    return this.data.lookup[id];
  }
});

//
});

