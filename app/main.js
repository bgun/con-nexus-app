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

require(["jquery", "underscore", "moment", "fastclick", "App"],
function( $,        _,            moment,   FastClick,   App) {

  window.addEventListener('load', function() {
      FastClick.attach(document.body);
  }, false);

  var $loading = $('#loading');

  window.app = new App();
  app.models = {};
  app.views = {};
  app.controllers = {};

  require([
    "models/con",
    "models/events",
    "models/guests",
    "models/places",
    "models/todo",
    "controllers/aboutController",
    "controllers/eventDetailController",
    "controllers/guestsController",
    "controllers/guestDetailController",
    "controllers/homeController",
    "controllers/hotelMapController",
    "controllers/localMapController",
    "controllers/scheduleController",
    "views/menu",
    "views/localMap"
  ], function(
    // models
    con,
    events,
    guests,
    places,
    todo,
    // controllers
    aboutController,
    eventDetailController,
    guestsController,
    guestDetailController,
    homeController,
    hotelMapController,
    localMapController,
    scheduleController,
    // global views
    menuView,
    localMapView
  ) {
  //

    app.settings = {
      api_url: 'http://con-nexus.herokuapp.com/api',
      con_id: "jcon2014"
    };

    app.models.con = con;
    app.models.events = events;
    app.models.guests = guests;
    app.models.places = places;
    app.models.todo = todo;

    todo.load(); // localStorage, no callback

    var con_model_params = {
      api_url: app.settings.api_url,
      con_id: app.settings.con_id
    };

    con.load(con_model_params, function(data) {
    
      localMapView.setView([data.lat, data.lon], 15);

      app.models.events.set(data.events, true);
      app.models.guests.set(data.guests, true);
      app.models.places.set(data.places, true);
      console.log(app.models);

      $loading.hide();
      $('#hero-photo')
        .css('background-image','url("/assets/jcon2014/cover01.jpg")')
        .find('.logo').attr('src','/assets/jcon2014/logo.png');

      app.router = new App.Router({
        context: app,
        defaultRoute: "home",
        routes: {
          "home"         : homeController,
          "about"        : aboutController,
          "schedule"     : scheduleController,
          "event-detail" : eventDetailController,
          "guests"       : guestsController,
          "guest-detail" : guestDetailController,
          "local-map"    : localMapController,
          "hotel-map"    : hotelMapController
        },
        onNavigate: function() {
          menuView.$el.trigger('close');
        }
      });
      app.router.start({
        context: app
      });

    });

  //
  });

});
