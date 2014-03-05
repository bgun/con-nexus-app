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
    "mapbox": {
      exports: 'L'
    }
  }
});

require(["jquery", "underscore", "mapbox", "jsrender", "moment", "fastclick", "app/App.js"],
function( $,        _,            mapbox,   jsrender,   moment,   FastClick,   App) {

  window.addEventListener('load', function() {
      FastClick.attach(document.body);
  }, false);

  var $loading = $('#loading');
  var $pageContainer = $('#pages');
  var pageClass = 'page';
  var activeClass = 'active';

  window.app = new App();

  var viewMixin = {
    activeClass: 'active',
    pageClass: 'page',
    show: function() {
      var t = this;
      $pageContainer.find('.'+t.pageClass+'.'+t.activeClass).removeClass(t.activeClass);
      t.$el.addClass(t.activeClass);
      app.views.header.setTitle(t.title);
      return t;
    }
  };
  _.extend(App.View.prototype, viewMixin);

  app.views = {};

  app.views.menu = new App.View({
    id: 'menu',
    events: {
      'click .menu-close': function(e) {
        e.preventDefault();
        console.log("menu click close");
        this.$el.trigger('close');
      },
      'close': function() {
        console.log("menu close");
        $pageContainer.removeClass('menu-open');
      },
      'toggle': function(e) {
        console.log("menu toggle");
        if(e) { e.preventDefault(); }
        $pageContainer.toggleClass('menu-open');
      }
    }
  });

  app.views.header = new App.View({
    id: 'header',
    events: {
      'click .menu-toggle': function(e) {
        e.preventDefault();
        console.log("header toggle");
        app.views.menu.$el.trigger('toggle');
      },
      'click .btn-back': function(e) {
        e.preventDefault();
        console.log("header back");
        window.history.back();
      },
      'click .btn-search': function(e) {
        e.preventDefault();
        console.log("Open search");
        var $s = this.$el.find('#search');
        if($s.hasClass('open')) {
          $s.find('input').blur();
          $s.removeClass('open');
          app.views.schedule.clearFilter();
        } else {
          $s.find('input').focus();
          $s.addClass('open');
        }
      },
      'click #search': function(e) {
        var $i = $(e.target);
        $i.find('input').blur().focus();
      },
      'keyup .search-input': function(e) {
        var text = $(e.target).val();
        if(text.length > 0) {
          app.views.schedule.filter(text);
        } else {
          app.views.schedule.clearFilter();
        }
      }
    },
    // custom methods
    setTitle: function(title) {
      this.$el.find('h1').text(title);
    },
    hideSearch: function() {
      this.$el.find('.btn-search').hide();
      this.$el.find('#search').removeClass('open');
    }
  });

  app.views.about = new App.View({
    id: 'about',
    title: 'About'
  });

  app.views.eventDetail = new App.View({
    id: 'event-detail',
    template: 'event-detail-template',
    title: 'Event Detail',
    // custom methods
    render: function(model, id) {
      var t = this;
      t.$el.find('.page-content').html(
        t.$template.render(model.data.lookup[id])
      );
    }
  });

  app.views.localMap = new App.View({
    id: 'local-map',
    title: 'Local Map',
    init: function() {
      this.map = L.mapbox.map('local-map-container', 'bgun.map-0xo3jced',{
        attributionControl: false,
        detectRetina: true,
        retinaVersion: 'bgun.map-0xo3jced'
      }).setView([34.02183,-84.32968],16);
    }
  });

  app.views.hotelMap = new App.View({
    id: 'hotel-map',
    title: 'Hotel Map',
    init: function() {
      this.map = L.map('hotel-map-container', {
        attributionControl: false,
      }).setView([0,0],16);
      // hotel map
      var hotelMapUrl = "https://www.grecianbay.com/assets/images/map.jpg";
      var hotelMapBounds = [[-0.006,-0.01],[0.006,0.01]];
      L.imageOverlay(hotelMapUrl, hotelMapBounds).addTo(this.map);
    }
  });

  app.views.schedule = new App.View({
    id: 'schedule',
    template: 'schedule-item-template',
    title: 'Schedule',
    // custom methods
    filter: function(text) {
      text = text.toLowerCase();
      console.log(text);
      var t = this;
      t.$el.find('li.event .time').show();
      t.$el.find('li.event').show().filter(function(i) {
        var t = $(this).text().toLowerCase();
        return t.indexOf(text) == -1;
      }).hide();
      t.$el.find('li.separator').hide();
      if(t.$el.find('li:visible').length === 0) {
        t.$el.find('.no-results').show();
      } else {
        t.$el.find('.no-results').hide();
      }
    },
    clearFilter: function() {
      var t = this;
      t.$el.find('li').show();
      t.$el.find('li.event .time').hide();
      t.$el.find('.no-results').hide();
    },
    render: function(model) {
      var t = this;
      console.log(model);
      t.$el.find('#schedule-list').html(
        t.$template.render(model.data.withSeparators)
      );
      return t;
    }
  });

  app.models = {};
  app.models.events = new App.Model({
    url: 'http://localhost:5000/api/events',
    parse: function(r) {
      var t = this;
      // todo: models!
      var schedule = [];
      var assocItems = {};
      var sortedItems = r.items;

      for(i = 0; i < sortedItems.length; i++) {
        a = sortedItems[i];
        a.fdate = moment(a.datetime).format("dddd h:mm a");
        assocItems[a.event_id] = a;
        if(i === 0) {
          schedule.push({ type: "separator", fdate: moment(a.datetime).format("dddd h:mm a")});
        }
        if(i > 0 && a.datetime > sortedItems[i-1].datetime) {
          schedule.push({ type: "separator", fdate: moment(a.datetime).format("dddd h:mm a")});
        }
        schedule.push(a);
      }

      return {
        lookup: assocItems,
        sorted: sortedItems,
        withSeparators: schedule
      };
    }
  });

  app.controllers = {};
  app.controllers.schedule = function() {
    var t = this;
    t.views.header.$el.find('.btn-back').hide();
    t.views.header.$el.find('.btn-search').show();
    t.views.schedule.show();
  };
  app.controllers.about = function() {
    var t = this;
    t.views.header.$el.find('.btn-back').hide();
    t.views.header.hideSearch();
    t.views.schedule.clearFilter();
    t.views.about.show();
  };
  app.controllers.eventDetail = function(id) {
    var t = this;
    t.views.eventDetail.render(t.models.events, id);
    t.views.header.$el.find('.btn-back').show();
    t.views.header.hideSearch();
    t.views.schedule.clearFilter();
    t.views.eventDetail.show();
  };
  app.controllers.localMap = function() {
    var t = this;
    t.views.header.$el.find('.btn-back').hide();
    t.views.header.hideSearch();
    t.views.localMap.show();
  };
  app.controllers.hotelMap = function() {
    var t = this;
    t.views.header.$el.find('.btn-back').hide();
    t.views.header.hideSearch();
    t.views.hotelMap.show();
  };

  // init
  app.models.events.load(function(data) {

    $loading.hide();
    app.views.schedule.render(app.models.events);

    app.router = new App.Router({
      context: app,
      defaultRoute: "schedule",
      routes: {
        "about"        : app.controllers.about,
        "schedule"     : app.controllers.schedule,
        "event-detail" : app.controllers.eventDetail,
        "local-map"    : app.controllers.localMap,
        "hotel-map"    : app.controllers.hotelMap
      },
      onNavigate: function() {
        app.views.menu.$el.trigger('close');
      }
    });
    app.router.start();

  });

});
