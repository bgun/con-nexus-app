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

    // cached jquery
    var $loading = $('#loading');
    var $networkOffline = $('#network-offline');

    window.app = new App({
      api_url: 'http://con-nexus.herokuapp.com/api',
      con_id: "libertycon2014"
    });

    // localStorage keys
    var LS_KEY_CON  = "con_"+app.settings.con_id;
    var LS_KEY_TODO = "todo_"+app.settings.con_id;

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

    todo.key = LS_KEY_TODO;
    todo.load(); // localStorage, no callback

    var con_model_params = {
      api_url: app.settings.api_url,
      con_id: app.settings.con_id
    };

    var init = function(data) {

      localStorage.setItem(LS_KEY_CON, JSON.stringify(data));

      localMapView.setView([data.lat, data.lon], 17);

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

    var $pages = $('#pages');
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

    app.confirm = function(msg, callback, title) {
      if(navigator.notifications) {
        return navigator.notifications.confirm(msg, callback, title);
      } else {
        return confirm(msg);
      }
    };

    $pages.on('click','a',function(e) {
      var url = $(this).attr('href');
      if(url.indexOf('http') === 0) {
        e.preventDefault();
        e.stopPropagation();
        if(app.confirm("Open "+url+" in your browser?", null, "External Link")) {
          window.open(url, '_system', 'location=yes');
        }
      }
    });

    $pages.on('click','.menu-close-overlay',function(e) {
      e.preventDefault();
      e.stopPropagation();
      $pages.removeClass('menu-open');
    });

    var checkUpdated = function() {
      var current_data = JSON.parse(localStorage.getItem(LS_KEY_CON));
      con.getBasic({
        params: con_model_params,
        success: function(server_data) {
          if(server_data.updated > current_data.updated) {
            app.toast("Found an update! Downloading convention data...",20000);
            con.load(con_model_params, init);
          } else {
            app.toast("You're up to date!");
            init(current_data);
          }
        },
        error: function() {
          app.toast("No network connection - using stored data");
          init(current_data);
        }
      });
    };

    if(app.online && localStorage.getItem(LS_KEY_CON)) {
      app.toast("Checking for updated convention data...",10000);
      checkUpdated();
    } else if(app.online) {
      // online but no cached data
      app.toast("Downloading convention data for the first time...",20000);
      con.load(con_model_params, init, function() {
        app.toast("Error loading convention data for the first time. Please make sure you have a network connection and restart the app.");
      });
    } else if(localStorage.getItem(LS_KEY_CON)) {
      // offline but we have a cache
      app.toast("No network connection - using stored data");
      init(current_data);
    } else {
      // offline, no cache
      app.toast("You need an Internet connection to download convention data for the first time.");
    }

  }); // end app require

}); // end lib require

} // end onDeviceReady
