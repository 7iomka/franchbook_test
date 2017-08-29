;(function ($) {
    'use strict';
    
      $.each($.validator.methods, function (key, value) {
          $.validator.methods[key] = function () {
              var el = $(arguments[1]);
              if (el.is('[placeholder]') && arguments[0] == el.attr('placeholder'))
                  arguments[0] = '';
              return value.apply(this, arguments);
          };
      });

      /** Phone validation **/
      $.validator.addMethod("usPhoneFormat", function (value, element) {
          return this.optional(element) || /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
      }, "Введите номер телефона в правильном формате");


      /** jQuery russian translation errors label **/
      $.extend($.validator.messages, {
              required: "Это поле необходимо заполнить",
              remote: "Исправьте это поле чтобы продолжить",
              email: "Введите правильный email адрес.",
              url: "Введите верный URL.",
              date: "Введите правильную дату.",
              dateISO: "Введите правильную дату (ISO).",
              number: "Введите число.",
              digits: "Введите только цифры.",
              creditcard: "Введите правильный номер вашей кредитной карты.",
              equalTo: "Повторите ввод значения еще раз.",
              accept: "Пожалуйста, введите значение с правильным расширением.",
              maxlength: $.validator.format("Нельзя вводить более {0} символов."),
              minlength: $.validator.format("Должно быть не менее {0} символов."),
              rangelength: $.validator.format("Введите от {0} до {1} символов."),
              range: $.validator.format("Введите число от {0} до {1}."),
              max: $.validator.format("Введите число меньше или равное {0}."),
              min: $.validator.format("Введите число больше или равное {0}.")
      });

}(jQuery));
