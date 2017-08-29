/********************************      transportGeography -- map settings      *******************/
  function contactsMapSettings() {
    var myMap,
        mapIsLoaded = false,
        $window = $(window);

    var $contactsMapContainer  = $('.contacts-map__container');

    var $mapPreloader        = $contactsMapContainer.find('.contacts-map__preloader'),
        $mapPreloaderOverlay = $contactsMapContainer.find('.contacts-map__preloader-overlay');


    $(document).on('afterShow.fb', function( e, instance, slide ) {
      // alert(slide.src);
      // if doesn't gallery
      if(typeof slide.src !== 'string' && $(slide.src)) {
        console.log($(slide.src).is('#contacts-map-modal'))
        if($(slide.src).is('#contacts-map-modal')) {
          expandMap();
        }
      }
    });



    /**
     * Expand map instructions
     */
    function expandMap(){

      if (mapIsLoaded) {
          return;
      }

      $contactsMapContainer.addClass('contacts-map__container--expanded');

      !mapIsLoaded && (
        $mapPreloaderOverlay.fadeIn(),
        $mapPreloader.fadeIn()
      );


      // if ymaps is not defined - get it
      if(typeof ymaps === 'undefined'){
        $.getScript('//api-maps.yandex.ru/2.1/?lang=ru_RU', afterYMapsReady);
      } else {
        afterYMapsReady();
      }

      function afterYMapsReady(){
        ymaps.ready(function() {

            YandexReadyHandlerSiteMap();
            setTimeout(function () {
                $mapPreloader.fadeOut(),
                $mapPreloaderOverlay.fadeOut(),
                mapIsLoaded = true;

            },200)

        });
      }

    }

    /**
     * Yandex map ready callback
     */
    function YandexReadyHandlerSiteMap() {
        if (!myMap) {
            myMap = new ymaps.Map("contacts-map", {
                center: [
                    59.820572, 30.360886
                ],
                zoom: 17,
                controls: [],
                type: "yandex#map"
            }, {suppressMapOpenBlock: true});

            var zoomControl = new ymaps.control.ZoomControl({
               options: {
                   size: "auto",
                   adjustMapMargin: true,
                   position: {
                    right: 10,
                    top: 220
                   }
               }
           });
           myMap.controls.add(zoomControl);

          //  if(Modernizr.touchevents) {
          //   //  myMap.events.add('touchstart', function (e) {
          //   //     e.preventDefault(); // При двойном щелчке зума не будет.
          //   //     alert('свайпить незя')
          //   //  });
          //    myMap.behaviors.disable('drag');
          //  }
          var adressObject = new ymaps.GeoObject({
              geometry: {
                  type: "Point",
                  coordinates: [59.820572, 30.360886]
              },
              properties: {
                  balloonContent: "Россия, 199178, Санкт-Петербург, <br>Московское ш., д.25, корп 1, лит. А, офис 201",
              }
          }, {
            preset: "islands#dotCircleIcon",
            // iconColor: '#1faee9',
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/icons/map-pin.png',
            iconImageSize: [22, 26],
            iconImageOffset: [-11, 0],
            iconOffset: [0, -26],
            // дополнительно смещаем балун, для открытия над иконкой.
            balloonOffset: [0, -26],
            hideIconOnBalloonOpen: false,
            pane: 'balloon',
          });

            myMap.geoObjects.add(adressObject);
            adressObject.balloon.open(myMap.getCenter());




            myMap.container.fitToViewport();
            // myMap.behaviors.disable('scrollZoom');
            myMap.behaviors.disable('wheel');

            return myMap;
        } else {
            myMap.destroy(); // Деструктор карты
            myMap = null;
        }
    }
  }

  domready(function () {
    exports.init = contactsMapSettings
  })
