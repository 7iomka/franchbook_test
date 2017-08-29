import { PhotoSwipe, PhotoSwipe_init } from 'vendors/photoswipe-init.js';



domready(function () {
  exports.init = function () {

    if (!$('.product-group__item-photos').length) return;

    $('.product-group__item').each(function () {
      var $self = $(this);
      console.log(typeof $self.find('.product-group__item-photos')[0])
      PhotoSwipe_init($self.find('.product-group__item-photos'));
    });

  }
})
