import 'vendors/slick';

const initCarousel = function (params) {
  let O;
  let P;
  let M;
  let carouselBehavior;
  let mediaCarouselBehavior;

  // Template settings
  const T = {
    class: 'c-carousel',
    mediaContainer: 'c-media-container',
    imagesContainer: 'c-carousel__images',
    videoContainer: 'c-media-container__video',
    mediaIconsContainer: 'c-carousel__media',
    slickActiveClass: 'slick-active',

    slidesToShow: {
      desktop: 5,
      tablet: 3,
      mobile: 3,
      smallMobile: 3,
    },
  };

  T.itemClass = T.itemClass || `${T.class}__item`;
  T.arrowClass = T.arrowClass || `${T.class}__arrow`;
  T.activeClass = T.activeClass || `${T.itemClass}_active`;
  T.paddingClass = T.paddingClass || `${T.imagesContainer}_padding`;
  T.smallClass = T.smallClass || `${T.imagesContainer}_small`;

  T.arrowTemplates = {
    vertical: {
      prevArrow: `<button class="${T.arrowClass} ${T.arrowClass}--prev button-prev button-prev--top" aria-label="previous">
                  <svg class="${T.arrowClass}-icon ${T.arrowClass}-icon--top"><use xlink:href="#arrow-top"/></svg>
                </button>`,
      nextArrow: `<button class="${T.arrowClass} ${T.arrowClass}--next button-next button-next--bottom" aria-label="next">
                  <svg class="${T.arrowClass}-icon ${T.arrowClass}-icon--bottom"><use xlink:href="#arrow-bottom"/></svg>
                </button>`,
    },
    horizontal: {
      prevArrow: `<button class="${T.arrowClass} ${T.arrowClass}--prev button-prev button-prev--left" aria-label="previous">
                      <svg class="${T.arrowClass}-icon ${T.arrowClass}-icon--left"><use xlink:href="#arrow-left"/></svg>
                    </button>`,
      nextArrow: `<button class="${T.arrowClass} ${T.arrowClass}--next button-next button-next--right" aria-label="next">
                      <svg class="${T.arrowClass}-icon ${T.arrowClass}-icon--right"><use xlink:href="#arrow-right"/></svg>
                    </button>`,
    },
  };
  M = $(`.${T.mediaContainer}`);
  O = $(`.${T.imagesContainer}`);


  let carouselParams = {
    asNavFor: M,
    vertical: true,
    touchMove: false,
    swipe: false,
    variableWidth: false,
    centerMode: true,
    centerPadding: false,
    slidesToScroll: 1,
    focusOnSelect: true,
    slidesToShow: T.slidesToShow.desktop,
    ...T.arrowTemplates.vertical,
    responsive: [{
      breakpoint: 992,
      settings: {
        vertical: false,
        variableWidth: true,
        slidesToShow: T.slidesToShow.tablet,
        ...T.arrowTemplates.horizontal,
      },
    }, {
      breakpoint: 768,
      settings: {
        vertical: false,
        variableWidth: true,
        slidesToShow: T.slidesToShow.mobile,
        ...T.arrowTemplates.horizontal,
      },
    }, {
      breakpoint: 350,
      settings: {
        vertical: false,
        variableWidth: true,
        slidesToShow: T.slidesToShow.smallMobile,
        ...T.arrowTemplates.horizontal,
      },
    }],
  };

  let mediaCarouselParams = {
    asNavFor: O,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };


  // extend params object with user params
  $.extend(true, carouselParams, params || {});


  const onInit = function(event, slick, direction) {
    lazyLoadInstance.update();
    console.log(event);
  };

  const onBreakPoint = (event, slick, breakpoint) => {

  };

  const onBeforeChange = (event, slick, currentSlide, nextSlide) => {
    // lazyLoadInstance.update();
  };

  const onAfterChange = (event, slick, currentSlide) => {

  };

  return ((() => {
    O.on('init', onInit);
    O.on('breakpoint', onBreakPoint);
    O.on('beforeChange', onBeforeChange);
    O.on('afterChange', onAfterChange);

    // if num of slides < slideToShow (maximum on desktop)
    P = O.find(`.${T.itemClass}`).length;
    carouselParams.slidesToShow = (P >= T.slidesToShow.desktop ? T.slidesToShow.desktop : P);
    // call thumbs carousel
    carouselBehavior = O.slick(carouselParams);
    // call main image carousel synced
    mediaCarouselBehavior = M.slick(mediaCarouselParams);

  })()),
  {
    carouselBehavior,
    mediaCarouselBehavior,
  };
};


domready(() => {
  exports.init = function (params) {
    initCarousel(params);
    // Calculate the heighest slide and set a top/bottom margin for other children.
    // As variableHeight is not supported yet: https://github.com/kenwheeler/slick/issues/1803
    // let maxHeight = -1;
    // $('.slick-slide').each(function () {
    //   if ($(this).height() > maxHeight) {
    //     maxHeight = $(this).height();
    //   }
    // });
    // $('.slick-slide').each(function () {
    //   if ($(this).height() < maxHeight) {
    //     $(this).css('margin', `${Math.ceil((maxHeight - $(this).height()) / 2)}px 0`);
    //   }
    // });
  };
});
