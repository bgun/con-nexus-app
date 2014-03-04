{{if type && type == "separator"}}
<li class="separator"><span>{{:fdate}}</span></li>
{{else}}
<li class="event">
  <a href="#event-detail/{{:event_id}}" data-event-id="{{:event_id}}">
    <span class="title">{{:title}}</span>
    <span class="time">{{:fdate}}</span>
  </a>
</li>
{{/if}}
