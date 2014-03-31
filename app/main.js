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

    // localStorage keys
    var LS_KEY_CON = "con";

    // cached jquery
    var $loading = $('#loading');
    var $toast   = $('#toast');

    window.app = new App({
      api_url: 'http://con-nexus.herokuapp.com/api',
      con_id: "jcon2014"
    });

    // so our controllers can access these later
    app.models = {
      con:    con,
      events: events,
      guests: guests,
      places: places,
      todo: todo
    };

    todo.load(); // localStorage, no callback

    var con_model_params = {
      api_url: app.settings.api_url,
      con_id: app.settings.con_id
    };

    var init = function(data) {

      console.log(data);

      localStorage.setItem(LS_KEY_CON, JSON.stringify(data));

      localMapView.setView([data.lat, data.lon], 15);

      app.models.events.set(data.events, true);
      app.models.guests.set(data.guests, true);
      app.models.places.set(data.places, true);

      $loading.hide();
      $toast.delay(2000).fadeOut();

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
    };

    app.checkConnection = function() {
      if(!navigator.connection) {
        return false;
      }
      var conn = navigator.connection.type != Connection.NONE;
      return conn;
    };

    var checkUpdated = function() {
      var current_data = JSON.parse(localStorage.getItem(LS_KEY_CON));
      if(app.checkConnection()) {
        con.getBasic(con_model_params, function(server_data) {
          if(current_data.updated > server_data.updated) {
            $toast.text("Checking for updated convention data...").show();
            con.load(con_model_params, init);
          } else {
            $toast.text("You're up to date!").show();
            init(current_data);
          }
        });
      } else {
        $toast.text("No network connection - using stored data").show();
        init(current_data);
      }
    };

    if(localStorage.getItem(LS_KEY_CON)) {
      $toast.text("Checking for updated convention data...").show();
      checkUpdated();
    } else {
      $toast.text("Downloading convention data for the first time...").show();
      if(app.checkConnection() || confirm("No connection found. You need an Internet connection to download convention data. Try anyway?")) {
        con.load(con_model_params, init);
      }
    }

  //
  });
});
