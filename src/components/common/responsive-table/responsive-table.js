
module.exports = function () {

  'use strict';

  /**
   * Responsive HTML Table
   *
   * @desc RWD: HTML table turns into an accordion.
   * @author [HZ]
   * @dependency jQuery
   */
  $.fn.responsiveTable = function (options) {
      // Defaults settings
      var defaults = {
          // These are the defaults.
          accordionHeight: 60
      }

      // This is the easiest way to have default options.
      var settings = $.extend(defaults, options );

      this.each(function () {
          $(this).find('table').each(function () {




              var trAcc = $(this).find('tr td:first-child'),
                  thHead = [];

              $(this).find('tr:first-child td, tr:first-child th').each(function () {
                  var headLines = $(this).html();
                  thHead.push(headLines);
              });

              trAcc.parent().each(function () {
                  for (var i = 0, l = thHead.length; i < l; i++) {
                      $(this).find('td').eq(i + 1).prepend('<h3>' + thHead[i + 1] + '</h3>');
                  }
              });

              trAcc.append('<i class="icon-accordion"></i>');
              // trAcc.each(function(){
              //
              // });

              var lastTr = $(this).find("tr:last-child").addClass('last');
              $(this).find('tr').not('.empty, thead > tr').each(function (i, tr) {
                // console.log($(tr).hasClass('last'))
                $(tr).css({
                  maxHeight: $(tr).hasClass('last') ? (+settings.accordionHeight+2)+ 'px' : settings.accordionHeight + 'px'
                });
              });
              trAcc.click(function (e) {

                if ($(this).parent().hasClass('accordion-opened')) {
                    var maxHeight = $(this).parent().hasClass('last') ? (+settings.accordionHeight+2): settings.accordionHeight;
                    $(this).parent().animate({
                        maxHeight: maxHeight + 'px'
                    }, 400).removeClass('accordion-opened').find('.icon-accordion').removeClass('icon-accordion--expanded');

                } else {
                    $(this).parent().animate({
                        maxHeight: '1000px'
                    }, 400).addClass('accordion-opened').find('.icon-accordion').addClass('icon-accordion--expanded');
                }
              });

              // var trs = $(this).find('tr').not('tr:first-child');
              var $accordeon = $('.icon-accordion').click(function () {
                $(this).parent().find('td:first-child').click();
              });

          });
      });
  };

  // Init
  $(function () {

    $('.responsive-table').each(function() {
      var params = {};
      if($(this).hasClass('responsive-table--cart')) {
        function calculateAccordionHeight(el) {
          return $(el).find('.product__cell-primary').outerHeight();
        }
        params.accordionHeight = calculateAccordionHeight(this);

        var self = this;
        var $accordions = $(this).find('.product__cell-primary');

        $(window).on('resize', function () {
          $accordions.each(function (i, accordion) {
            if($(this).closest('tr').hasClass('accordion-opened')) return;

            $(this).closest('tr').css({
              maxHeight: calculateAccordionHeight(self) + 'px'
            });
          });
        });
      }

      $(this).responsiveTable(params);
    });

  });

}();
