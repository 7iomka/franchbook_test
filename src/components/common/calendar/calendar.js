const Flatpickr = require("flatpickr");

import {ru as Russian} from "vendors/flatpickr-ru.js";
Flatpickr.localize(Russian); // default locale is now Russian

/**
 * Order date config for calendar
 */

var $calendar = $('.flatpickr');


$calendar.each(function () {
  var htmlNode = $(this)[0]
      $this = $(this);
  var calendarConfig = {
    dateFormat: "d.m.Y",
    defaultDate: new Date(),
    static: true,
    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 13.13 12.29"> <defs> <style id="style5">.cls-1{fill:none;stroke:#b9b9b8;stroke-linecap:round;stroke-miterlimit:10;}</style> </defs> <line y2="6.1399999" x2="0.5" y1="6.1399999" x1="12.63" class="cls-1" /> <line y2="6.1399999" x2="0.5" y1="0.5" x1="6.1500001" class="cls-1" /> <line y2="6.1399999" x2="0.5" y1="11.79" x1="6.1500001" class="cls-1"/></svg>',
	  nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 13.13 12.29"><defs><style>.cls-1{fill:none;stroke:#b9b9b8;stroke-linecap:round;stroke-miterlimit:10;}</style></defs><title>arrow</title><line class="cls-1" x1="0.5" y1="6.14" x2="12.63" y2="6.14"></line><line class="cls-1" x1="6.98" y1="0.5" x2="12.63" y2="6.14"></line><line class="cls-1" x1="6.98" y1="11.79" x2="12.63" y2="6.14"></line></svg>'
  };

  if($this.hasClass('flatpickr--inline')) {
    calendarConfig.inline = true; // show the calendar inline
  }
  // if($this.hasClass('flatpickr--order')) {
  //   calendarConfig.disable = [
  //       function (date) {
  //           return date.getDay() === 0 || date.getDay() === 6; // disable weekends
  //       }
  //   ]
  // }
  new Flatpickr(htmlNode, calendarConfig); // where first parametr is an html node, not a selector and not a jQuery obj (!)
})
