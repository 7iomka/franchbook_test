// fancybox 3.1.8
import 'vendors/jquery.fancybox.min.js';

function modalActions() {
  var modalDefaults = {
    autoFocus: false,
    clickOutside : 'close',
    touch :  {
      vertical: false
    },
    hash : false,
    // infobar: true,
    transitionEffect : "slide",
    // transitionDuration : 300, // replaced by duration in css
    spinnerTpl : '<div class="preloader fancybox-preloader" style="display:block"></div>',
    lang : 'ru',
    i18n : {
      'ru' : {
        CLOSE       : 'Закрыть',
        NEXT        : 'Вперёд',
        PREV        : 'Назад',
        ERROR       : 'Не удалось установить соединение. <br/> Пожалуйста, попробуйте позднее.',
        PLAY_START  : 'Начать слайдшоу',
        PLAY_STOP   : 'Поставить на паузу',
        FULL_SCREEN : 'На полный экран',
        THUMBS      : 'Превьюшки'
      },
    }
  }
  var fancyboxDefaults = $.extend(true, $.fancybox.defaults, modalDefaults);
  console.log(fancyboxDefaults);

  // for modals with custom content and indicated modal-target attribute
  if(!$('.modal-link').length) return;

  $('.modal-link').on('click', function(){

    var modalTarget = $(this).data('modal-target');
    var $modalTarget = $(modalTarget);


    // prevent multiple
    $.fancybox.close();

    $.fancybox.open( $modalTarget , {
        // setup only for modals (not gallery)
        touch : false,
    } );
  });

  // custom close button
  if($('.modal-close').length ) {
    $('.modal-close').on('click', function () {
      // close current active modal
      $.fancybox.close();
    });
  }

}



domready(function () {
  exports.init = modalActions
})
