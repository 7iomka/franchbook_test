domready(function () {
  exports.init = function () {
      var $images = $('img[data-src]').not('.fullLoaded');

      $images.each(function () {
        var $this = $(this);
        var src = $this.data('src');

        if (!src)
          return;

        $this.attr('src', src);
        $this.addClass('fullLoaded');

      });

  }
});
