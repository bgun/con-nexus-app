define(['jquery','underscore','jsrender'],
function($,       _,           jsrender) {
//

  var baseUrl = './templates/';
  var loaded = {};

  return {
    load: function(name, callback, context) {
      if(typeof loaded[name] !== 'undefined') {
        callback.call(context, loaded[name]);
      } else {
        $.ajax({
          url: baseUrl+name+'.html.js',
          async: false,
          dataType: 'text',
          success: function(template) {
            console.log("loaded template",template);
            loaded[name] = $.templates(template);
            callback.call(context, loaded[name]);
          }
        });
      }
    }
  };

//
});
