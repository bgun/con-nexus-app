define(["App"], function(App) {
//

return new App.View({
  id: 'event-detail',
  template: 'event-detail-template',
  title: 'Event Detail',
  // custom methods
  render: function(item) {
    console.log("rendering",item);

    var t = this;
    t.$el.find('.page-content').html(
      t.$template.render(item)
    );

    $addTodo = t.$el.find('.add-todo');
    $remTodo = t.$el.find('.remove-todo');

    $addTodo.off().on('click',function(e) {
      var $target = $(e.target);
      var eventId = $target.attr('data-event-id');
      t.$el.trigger('add-todo',eventId);

      $addTodo.hide();
      $remTodo.show();
    });

    $remTodo.off().on('click',function(e) {
      var $target = $(e.target);
      var eventId = $target.attr('data-event-id');
      t.$el.trigger('remove-todo',eventId);

      $remTodo.hide();
      $addTodo.show();
    });
  }
});

//
});
