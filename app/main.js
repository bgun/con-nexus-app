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

// check for mobile
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}

function onDeviceReady() {

// lib require
require(["jquery", "underscore", "moment", "fastclick", "App"],
function( $,        _,            moment,   FastClick,   App) {

  // remove 200ms delay on mobile click
  FastClick.attach(document.body);

  // app require
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
    "controllers/feedbackController",
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
    feedbackController,
    // global views
    menuView,
    localMapView
  ) {
  //

    // localStorage keys
    var LS_KEY_CON = "con";

    // cached jquery
    var $loading = $('#loading');
    var $networkOffline = $('#network-offline');

    window.app = new App({
      api_url: 'http://con-nexus.herokuapp.com/api',
      con_id: "jcon2014"
    });

    // network check
    app.online = true;
    document.addEventListener('online',function() {
      app.online = true;
      $networkOffline.fadeOut();
    }, false);
    document.addEventListener('offline',function() {
      app.online = false;
      $networkOffline.fadeIn();
    }, false);

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
          "hotel-map"    : hotelMapController,
          "feedback"     : feedbackController
        },
        onNavigate: function() {
          menuView.$el.trigger('close');
        }
      });
      app.router.start({
        context: app
      });
    };

    var $toast = $('#toast');
    var toastTimeout;
    app.toast = function(text, delay) {
      if(!delay) {
        delay = 3000;
      }
      $toast.text(text).fadeIn();
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(function() {
        $toast.fadeOut();
      },delay);
    };

    $('#pages').on('click','a',function(e) {
      var url = $(this).attr('href');
      if(url.indexOf('http') === 0) {
        e.preventDefault();
        e.stopPropagation();
        if(confirm("Open "+url+" in external browser?")) {
          window.open(url, '_system', 'location=yes');
        }
      }
    });

    var checkUpdated = function() {
      var current_data = JSON.parse(localStorage.getItem(LS_KEY_CON));
      if(app.online) {
        con.getBasic(con_model_params, function(server_data) {
          if(server_data.updated > current_data.updated) {
            app.toast("Found an update! Downloading convention data...");
            con.load(con_model_params, init);
          } else {
            app.toast("You're up to date!");
            init(current_data);
          }
        });
      } else {
        app.toast("No network connection - using stored data");
        init(current_data);
      }
    };

    if(localStorage.getItem(LS_KEY_CON)) {
      app.toast("Checking for updated convention data...");
      checkUpdated();
    } else {
      app.toast("Downloading convention data for the first time...");
      if(app.online || confirm("No connection found. You need an Internet connection to download convention data. Try anyway?")) {
        con.load(con_model_params, init);
      }
    }

  }); // end app require

}); // end lib require

} // end onDeviceReady
