define(["views/header","views/home"], function(headerView, homeView) {
//

  return function() {
    headerView.$el.find('.btn-back').hide();
    headerView.toggleSearch(false);
    headerView.setTitle(homeView.title);

    todoArray = this.models.todo.data;
    todoItems = this.models.events.getById(todoArray);
    homeView.renderTodo(todoItems);
    homeView.show();
  };

});
