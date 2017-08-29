var rx = require('vendors/ripple.min.js');

module.exports = function () {

  var rippleBtns = $.ripple(".c-button", {
      debug: false, // Turn Ripple.js logging on/off
      on: 'mousedown', // The event to trigger a ripple effect

      opacity: 0.4, // The opacity of the ripple
      color: "auto", // Set the background color. If set to "auto", it will use the text color
      multi: false, // Allow multiple ripples per element

      duration: 1.3, // The duration of the ripple

      // Filter function for modifying the speed of the ripple
      rate: function(pxPerSecond) {
          return pxPerSecond;
      },

      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // The CSS3 easing function of the ripple
  });

  // for buttons with multiple values
  if($('.c-button--multiple-values').length) {
    $('.c-button--multiple-values').on('click', function () {
      $(this).toggleClass('c-button--toggled');
    });
  }

}();
