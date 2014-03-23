require.config({
  baseUrl: "app/",
  paths: {
    fastclick:  "../lib/fastclick",
    jquery:     "../lib/jquery-2.1.0.min",
    jsrender:   "../lib/jsrender.min",
    mapbox:     "../lib/mapbox",
    moment:     "../lib/moment.min",
    underscore: "../lib/underscore-min"
  },
  shim: {
    "underscore": {
      exports: '_'
    },
    "jsrender": ['jquery'],
    "mapbox": {
      exports: 'L'
    }
  }
});

require(["jquery", "underscore", "jsrender", "moment", "fastclick", "App"],
function( $,        _,            jsrender,   moment,   FastClick,   App) {

  window.addEventListener('load', function() {
      FastClick.attach(document.body);
  }, false);

  var $loading = $('#loading');

  window.app = new App();

  app.models = {};
  app.views = {};
  app.controllers = {};

  require([
    "models/events",
    "controllers/aboutController",
    "controllers/eventDetailController",
    "controllers/homeController",
    "controllers/hotelMapController",
    "controllers/localMapController",
    "controllers/scheduleController",
    "views/menu"
  ], function(
    events,
    aboutController,
    eventDetailController,
    homeController,
    hotelMapController,
    localMapController,
    scheduleController,
    menuView
  ) {
  //

    events.load(function(data) {

      console.log("Events loaded.", data);
      localStorage.setItem("events", JSON.stringify(data));

      $loading.hide();

      app.router = new App.Router({
        context: app,
        defaultRoute: "home",
        routes: {
          "home"         : homeController,
          "about"        : aboutController,
          "schedule"     : scheduleController,
          "event-detail" : eventDetailController,
          "local-map"    : localMapController,
          "hotel-map"    : hotelMapController
        },
        onNavigate: function() {
          menuView.$el.trigger('close');
        }
      });
      app.router.start();

    });

  //
  });

});
