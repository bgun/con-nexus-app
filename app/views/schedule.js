define(["App"], function(App) {
//

return new App.View({
  id: 'schedule',
  template: 'schedule-item-template',
  title: 'Schedule',
  // custom methods
  filter: function(text) {
    text = text.toLowerCase();
    console.log(text);
    var t = this;
    t.$el.find('li.past').addClass('unhide');
    t.$el.find('li.event .time').show();
    t.$el.find('li.event').show().filter(function(i) {
      var t = $(this).text().toLowerCase();
      return t.indexOf(text) == -1;
    }).hide();
    t.$el.find('li.separator').hide();
    if(t.$el.find('li:visible').length === 0) {
      t.$el.find('.no-results').show();
    } else {
      t.$el.find('.no-results').hide();
    }
  },
  clearFilter: function() {
    var t = this;
    t.$el.find('li').show();
    t.$el.find('li.past').hide().removeClass('unhide');
    t.$el.find('li.event .time').hide();
    t.$el.find('.no-results').hide();
  },
  addSeparators: function(items) {
    var arr = [];
    items = this.model.sort(items);
    for(var i = 0; i < items.length; i++) {
      if(i === 0 || (i > 0 && items[i].datetime > items[i-1].datetime)) {
        arr.push({ type: "separator", datetime: items[i].datetime, fdate: moment(items[i].datetime).format("dddd h:mm a")});
      }
      arr.push(items[i]);
    }
    console.log(arr);
    return arr;
  },
  render: function(model) {
    var t = this;
    t.model = model;

    //var now = new Date('2013-06-28 20:01:00');
    var now = new Date();
    now.setHours(now.getHours()-1);
    var items = t.addSeparators(model.data);
    var visible = 0;
    for(var i in items) {
      if(now > new Date(items[i].datetime)) {
        items[i].display = false;
      } else {
        items[i].display = true;
        visible++;
      }
    }
    if(visible === 0) {
      t.$el.find('.show-all').show();
    } else {
      t.$el.find('.show-all').hide();
    }
    var html = t.$template.render(items);
    t.$el.find('#schedule-list').html(html);
    return t;
  }
});

//
});
