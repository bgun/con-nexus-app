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
    t.$el.find('li.event .time').hide();
    t.$el.find('.no-results').hide();
    t.$el.scrollTop(t.nowPosition);
  },
  addSeparators: function(items) {
    var past, arr = [];
    items = this.model.sort(items);
    for(var i = 0; i < items.length; i++) {
      //var now = new Date('2014-04-12 20:00:00');
      var now = new Date();
      past = new Date(items[i].datetime) < now;
      items[i].past = past;
      if(i === 0 || (i > 0 && items[i].datetime > items[i-1].datetime)) {
        separator = {
          type: "separator",
          datetime: items[i].datetime,
          fdate: moment(items[i].datetime).format("dddd h:mm a"),
          past: past
        };
        arr.push(separator);
      }
      arr.push(items[i]);
    }
    return arr;
  },
  gotoCurrentTime: function() {
    var t = this;
  },
  render: function(model) {
    var t = this;
    t.model = model;

    var items = t.addSeparators(model.data);
    var visible = 0;
    var html = t.$template.render(items);
    t.$el.find('#schedule-list').html(html);

    var $past = t.$el.find('.past');
    // nowPosition is the scroll position of the last "past" item in the schedule
    t.nowPosition = $past.length ? $past.last().offset().top : 0;
    t.$el.scrollTop(t.nowPosition);
    return t;
  }
});

//
});
