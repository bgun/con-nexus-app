define(['App'], function(App) {
//

return new App.View({
  id: 'home',
  title: 'Home',
  template: 'schedule-item-template', // for todo list
  renderTodo: function(items) {
    var t = this;
    var $todo = t.$el.find('#todo-list');
    var $todoTitle = t.$el.find('#todo-list-title');
    if(items && items.length) {
      $todo.html(t.$template.render(items));
    }
  }
});

//
});
