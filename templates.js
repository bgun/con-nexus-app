(function() {
window["JST"] = window["JST"] || {};

window["JST"]["event-detail"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<span class="event-date">' +
((__t = ( fdate )) == null ? '' : __t) +
'</span><br />\n<span class="event-room">' +
((__t = ( room )) == null ? '' : __t) +
'</span>\n<p class="event-description">' +
((__t = ( description )) == null ? '' : __t) +
'</p>\n<button type="button" class="btn btn-todo remove-todo ';
 if(!inTodo) { ;
__p += 'hidden';
 } ;
__p += '" data-event-id="' +
((__t = ( event_id )) == null ? '' : __t) +
'">Remove from My Todo</button>\n<button type="button" class="btn btn-todo add-todo    ';
 if(inTodo) { ;
__p += 'hidden';
 } ;
__p += '" data-event-id="' +
((__t = ( event_id )) == null ? '' : __t) +
'">Add to My Todo</button>\n\n<h4>Presenters</h4>\n<ul id="event-guest-list" class="guest-list">\n' +
((__t = ( _.map(guest_list_objects, function(g) {
  return JST['guest-item'](g);
}).join('') )) == null ? '' : __t) +
'\n</ul>\n\n<a href="#feedback/' +
((__t = ( event_id )) == null ? '' : __t) +
'" class="event-feedback">Submit feedback about <strong>' +
((__t = ( title )) == null ? '' : __t) +
'</strong></a>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["guest-detail"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h1 class="guest-name">' +
((__t = ( name )) == null ? '' : __t) +
'</h1>\n<h3 class="guest-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h3>\n<h4>Itinerary</h4>\n<ul id="guest-event-list" class="event-list">\n  ' +
((__t = ( _.map(event_list_objects, function(ev) {
    return JST['schedule-item'](ev);
  }).join('') )) == null ? '' : __t) +
'\n</ul>\n';
 if(bio) { ;
__p += '\n  <h4>About ' +
((__t = ( name )) == null ? '' : __t) +
'</h4>\n  ';
 if(image) { ;
__p += '\n    <img class="guest-image" src="./assets/libertycon2014/propics/' +
((__t = ( image )) == null ? '' : __t) +
'" onerror="this.src=\'http://libertycon.org/images/pros/' +
((__t = ( image )) == null ? '' : __t) +
'\'" />\n  ';
 } ;
__p += '\n  <p>' +
((__t = ( bio )) == null ? '' : __t) +
'</p>\n';
 } ;


}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["guest-item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="guest-item"><a href="#guest-detail/' +
((__t = ( guest_id )) == null ? '' : __t) +
'">' +
((__t = ( name )) == null ? '' : __t) +
'<span class="guest-title">' +
((__t = ( title )) == null ? '' : __t) +
'</span></a></li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["map-popup"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="map-popup">\n\t<h2 class="place-name">' +
((__t = ( name )) == null ? '' : __t) +
'</h2>\n\t<h3 class="place-subtitle ' +
((__t = ( icon )) == null ? '' : __t) +
'">' +
((__t = ( subtitle )) == null ? '' : __t) +
'</h3>\n\t<address>' +
((__t = ( address )) == null ? '' : __t) +
'<br />' +
((__t = ( city )) == null ? '' : __t) +
', ' +
((__t = ( state )) == null ? '' : __t) +
' ' +
((__t = ( zip )) == null ? '' : __t) +
'</address><br />\n\t<a href="tel:' +
((__t = ( formatted_phone )) == null ? '' : __t) +
'" class="phone">' +
((__t = ( phone )) == null ? '' : __t) +
'</a>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["schedule-item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(type && type == "separator") { ;
__p += '\n<li class="separator ';
 if(past) { ;
__p += 'past';
 } ;
__p += '"><span>' +
((__t = ( fdate )) == null ? '' : __t) +
'</span></li>\n';
 } else { ;
__p += '\n<li class="event ';
 if(todo) { ;
__p += 'todo';
 } ;
__p += ' ';
 if(past) { ;
__p += 'past';
 } ;
__p += '">\n<a href="#event-detail/' +
((__t = ( event_id )) == null ? '' : __t) +
'" data-event-id="' +
((__t = ( event_id )) == null ? '' : __t) +
'">\n  <span class="title">' +
((__t = ( title )) == null ? '' : __t) +
'</span>\n  <span class="room">' +
((__t = ( room )) == null ? '' : __t) +
'</span>\n  <span class="time">' +
((__t = ( fdate )) == null ? '' : __t) +
'</span>\n</a>\n</li>\n';
 } ;


}
return __p
}})();