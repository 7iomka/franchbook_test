domready(() => {
  exports.init = function () {
    const $links = $('.scroll-link');
    const $navToggler = $('.navigation-toggler');

    $links.on('click', function (e) {
      e.preventDefault();
      // if menu is open -- close it
      $navToggler.hasClass('active') && $navToggler.click();

      // if this is button - get data-href || else - get href attr
      const dataHref = $(this).data('href');
      const href = $(this).attr('href');
      const target = dataHref || href;
      if (!$(target).length) {
        console.log(`element with attribute ${target} not found on the page`);
        return;
      }

      let offset;
      // if ($(".header__bottom--fixed").is(":visible") == true) {
      //     offset = $(".header__bottom--fixed").innerHeight();
      // } else {
      //     offset = 0;
      // }
      offset = $('.header__bottom--fixed').innerHeight() || 60;
      TweenMax.to(window, 1.5, {
        scrollTo: {
          y: target,
          offsetY: offset,
        },
        ease: Expo.easeInOut,
      });
    });
  };
});
