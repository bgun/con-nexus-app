var App = function() {
  this.init();
};
App.prototype.init = function(options) {
  console.log("App init");
  new NoClickDelay(document.getElementById('menu'));
  new NoClickDelay(document.getElementById('header'));
};

App.View = function(options) {
  var t = this;
  var parts, ev, evname, sel;
  $.extend(t, options);
  t.$el = $('#'+options.id);
  t.$template = $('#'+options.template);
  console.log("Constructing view: "+options.id);
  for(ev in t.events) {
    if(t.events.hasOwnProperty(ev)) {
      parts = ev.split(" ");
      evname = parts.shift();
      sel = parts.join(" ");
      console.log("Setting "+evname+" event for #"+t.$el.attr('id')+" "+sel);
      (function(evt) {
        t.$el.on(evname, sel, function() {
          var args = Array.prototype.slice.call(arguments);
          t.events[evt].apply(t, args);
        });
      })(ev);
    }
  }
  if(t.init) {
    t.init.apply(t);
  }
};


App.Model = function(options) {
  var t = this;
  t.url = options.url;
  t.parse = options.parse;
};
App.Model.prototype.load = function(callback) {
  var t = this;
  $.ajax({
    url: t.url,
    type: 'GET',
    dataType: 'json',
    success: function(resp) {
      if(typeof t.parse === 'function') {
        t.data = t.parse.apply(t, [resp]);
      } else {
        t.data = resp;
      }
      callback.apply(t, [t.data]);
    }
  });
};


App.Router = function(options) {
  var defaults = {
    containerId: "pages",
    pageClass: "page",
    activeClass: "active"
  };
  this.options = $.extend({}, defaults, options);
};
App.Router.prototype.start = function() {
  console.log("Router start");
  var t = this;
  t.context = t.options.context;
  t.routes = t.options.routes;
  var path = window.location.hash.substr(1);
  path = path || t.options.defaultRoute;
  t.navigate(path);
  $(window).on('hashchange',function(e) {
    var path = window.location.hash.substr(1);
    path = path || t.options.defaultRoute;
    t.navigate(path);
  });
};
App.Router.prototype.navigate = function(path) {
  console.log("Navigating to "+path);
  var t = this;
  var parts = path.split('/');
  var page = parts.shift();
  if(t.routes.hasOwnProperty(page)) {
    t.routes[page].apply(t.context, parts);
  }
  this.options.onNavigate.apply(this);
};