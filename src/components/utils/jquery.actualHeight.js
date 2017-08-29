// calculate actual height of hidden element
jQuery(function( $ ){
  $.fn.actualHeight = function(type){
        // find the closest visible parent and get it's hidden children
    var visibleParent = this.closest(':visible').children(),
        thisHeight;

    // set a temporary class on the hidden parent of the element
    visibleParent.addClass('temp-show');

    if(type) {
      // get the outer height
      if (typeof type === 'object') {
        thisHeight = this.outerHeight(type.includeMargin);
      } else {
        thisHeight = this.outerHeight();
      }

    }
    else {
      // get the height
      thisHeight = this.height();
    }

    // remove the temporary class
    visibleParent.removeClass('temp-show');

    return thisHeight;
  };

});
