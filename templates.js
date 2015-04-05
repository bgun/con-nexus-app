(function() {
window["JST"] = window["JST"] || {};

window["JST"]["event-detail.tmpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class="event-date">{{:fdate}}</span><br />\n<span class="event-room">{{:room_name}}</span>\n<p class="event-description">{{:description}}</p>\n<button type="button" class="btn btn-todo remove-todo {{if !inTodo}}hidden{{/if}}" data-event-id="{{:event_id}}">Remove from My Todo</button>\n<button type="button" class="btn btn-todo add-todo    {{if inTodo }}hidden{{/if}}" data-event-id="{{:event_id}}">Add to My Todo</button>\n\n<h4>Presenters</h4>\n<ul id="event-guest-list" class="guest-list">\n{{for guest_list_objects tmpl="#guest-item-template" /}}\n</ul>\n\n<a href="#feedback/{{:event_id}}" class="event-feedback">Submit feedback about <strong>{{:title}}</strong></a>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["guest-detail.tmpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 class="guest-name">{{:name}}</h1>\n<h3 class="guest-title">{{:title}}</h3>\n<h4>Itinerary</h4>\n<ul id="guest-event-list" class="event-list">\n  {{for event_list_objects tmpl="#schedule-item-template" /}}\n</ul>\n{{if bio}}\n  <h4>About {{:name}}</h4>\n  {{if image}}\n    <img class="guest-image" src="./assets/libertycon2014/propics/{{:image}}" onerror="this.src=\'http://libertycon.org/images/pros/{{:image}}\'" />\n  {{/if}}\n  <p>{{:bio}}</p>\n{{/if}}\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["guest-item.tmpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="guest-item"><a href="#guest-detail/{{:guest_id}}">{{:name}} <span class="guest-title">{{:title}}</span></a></li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["map-popup.tmpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="map-popup">\n\t<h2 class="place-name">{{:name}}</h2>\n\t<h3 class="place-subtitle {{:icon}}">{{:subtitle}}</h3>\n\t<address>{{:address}}<br />{{:city}}, {{:state}} {{:zip}}</address><br />\n\t<a href="tel:{{:formatted_phone}}" class="phone">{{:phone}}</a>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["schedule-item.tmpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="separator {{if past}}past{{/if}}"><span>{{:fdate}}</span></li>\n{{else}}\n<li class="event {{if todo}}todo{{/if}} {{if past}}past{{/if}}">\n<a href="#event-detail/{{:event_id}}" data-event-id="{{:event_id}}">\n  <span class="title">{{:title}}</span>\n  <span class="room">{{:room_name}}</span>\n  <span class="time">{{:fdate}}</span>\n</a>\n</li>\n{{/if}}';

}
return __p
}})();