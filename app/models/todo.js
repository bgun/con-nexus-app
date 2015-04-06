'use strict';

var App = require('../App.js');

module.exports = new App.Model({

  url: '',
  load: function() {
    var json = localStorage.getItem(this.key) || "[]";
    this.data = JSON.parse(json);
  },
  addTodo: function(id) {
    if(!this.hasItem(id)) {
      console.log("adding "+id+" to Todo");
      this.data.push(id);
      this.save(this.data);
    } else {
      console.log(id+" already present in todo");
    }
  },
  removeTodo: function(id) {
    var i = this.data.indexOf(id);
    if(i > -1) {
      console.log("removing "+id+" from Todo");
      this.data.splice(i,1);
      this.save(this.data);
    } else {
      console.log("item not in todo yet");
    }
  },
  save: function(data) {
    var json = JSON.stringify(data);
    localStorage.setItem(this.key, json);
  },
  hasItem: function(id) {
    return this.data.indexOf(id) > -1;
  }
});