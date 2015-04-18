'use strict';

global.$         = require('jquery');
global._         = require('lodash');
global.mapbox    = require('./lib/mapbox.js');

var App = require('./App.js');
var FastClick = require('fastclick');

var con    = require('./models/con.js');
var events = require('./models/events.js');
var guests = require('./models/guests.js');
var places = require('./models/places.js');
var todo   = require('./models/todo.js');

var aboutController       = require("./controllers/aboutController.js");
var eventDetailController = require("./controllers/eventDetailController.js");
var guestsController      = require("./controllers/guestsController.js");
var guestDetailController = require("./controllers/guestDetailController.js");
var homeController        = require("./controllers/homeController.js");
var hotelMapController    = require("./controllers/hotelMapController.js");
var localMapController    = require("./controllers/localMapController.js");
var scheduleController    = require("./controllers/scheduleController.js");
var feedbackController    = require("./controllers/feedbackController.js");

var menuView     = require('./views/menu.js');
var localMapView = require('./views/localMap.js');

// check for mobile
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}

function onDeviceReady() {

  // remove 200ms delay on mobile click
  FastClick(document.body);

  // cached jquery
  var $loading = $('#loading');
  var $networkOffline = $('#network-offline');

  window.app = new App({
    api_url: 'http://con-nexus.herokuapp.com/api',
    con_id: "testcon"
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

  var exitApp = function() {
    if(navigator.app) {
      navigator.app.exitApp();
    } else {
      console.error("No navigator.app");
    }
  };

  var init = function(data) {

    window.data = data;

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
        "about"        : aboutController,
        "event-detail" : eventDetailController,
        "exit"         : exitApp,
        "feedback"     : feedbackController,
        "guests"       : guestsController,
        "guest-detail" : guestDetailController,
        "home"         : homeController,
        "hotel-map"    : hotelMapController,
        "local-map"    : localMapController,
        "schedule"     : scheduleController
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
  var $restart = $('#restart');
  var $toast = $('#toast');
  var toastTimeout;
  app.toast = function(text, delay) {
    if(!delay) {
      delay = 3000;
    }
    $toast.html(text).fadeIn();
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

  $restart.on('click',function() {
    $loading.show();
    app.toast("Checking for updated convention data...");
    setTimeout(function() {
      checkIfUpdatePossible();
    },2000);
  });

  var checkUpdated = function() {
    var current_data = JSON.parse(localStorage.getItem(LS_KEY_CON));
    con.getBasic({
      params: con_model_params,
      success: function(server_data) {
        console.log("BASIC",server_data);
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

  var checkIfUpdatePossible = function() {
    if(app.online && localStorage.getItem(LS_KEY_CON)) {
      // online and we have cached data, might be old
      app.toast("Checking for updated convention data...",10000);
      checkUpdated();
    } else if(app.online) {
      // online but no cached data
      app.toast("Downloading convention data for the first time...",20000);
      con.load(con_model_params, init, function() {
        app.toast("Error loading convention data for the first time. Please make sure you have a network connection, then restart the app.",20000);
      });
    } else if(localStorage.getItem(LS_KEY_CON)) {
      // offline but we have a cache
      app.toast("No network connection - using stored data");
      init(current_data);
    } else {
      // offline, no cache
      app.toast("You need an Internet connection to download convention data for the first time.");
    }
  };

  checkIfUpdatePossible();

}; // end onDeviceReady
