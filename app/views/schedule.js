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
  },
  render: function(data) {
    var t = this;
    t.$el.find('#schedule-list').html(
      t.$template.render(data.withSeparators)
    );
    return t;
  }
});

//
});
