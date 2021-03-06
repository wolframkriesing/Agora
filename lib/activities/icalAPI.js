"use strict";

var _ = require('underscore');
var icalendar = require('icalendar');


function activityAsICal(activity) {
  var event = new icalendar.VEvent(activity.url());
  event.setSummary(activity.title());
  event.setDescription(activity.description().replace(/\r\n/g, '\n'));
  event.addProperty('LOCATION', activity.location().replace(/\r\n/g, '\n'));
  event.setDate(activity.startMoment().toDate(), activity.endMoment().toDate());
  return event;
}

module.exports = {
  activityAsICal: activityAsICal,

  icalForActivities: function (activities) {
    var ical = new icalendar.iCalendar();
    _.each(activities, function (activity) {
      ical.addComponent(activityAsICal(activity));
    });
    return ical;
  }
};
