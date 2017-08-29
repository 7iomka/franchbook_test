/********************************      Footer -- map settings      *******************/
  function footerMapSettings() {
    var myMap,
        mapIsLoaded = false;

    var $footerBody              = $('.footer__body');

    var $mapToggler          = $footerBody.find( $('.footer__map-toggler') );
    var $mapPreloader        = $footerBody.find( $('.footer__preloader') ),
        $mapPreloaderOverlay = $footerBody.find( $('.footer__preloader-overlay') );

    $mapToggler.on('click', function() {

        $footerBody.toggleClass('footer__body--map-expanded');

        !mapIsLoaded && (
          $mapToggler.hide(),
          $mapPreloaderOverlay.fadeIn(),
          $mapPreloader.fadeIn()
        );

        if (mapIsLoaded) {
            return;
        }

        $.getScript('//api-maps.yandex.ru/2.1/?lang=ru_RU', function() {

            ymaps.ready(function() {

                YandexReadyHandlerSiteMap();
                setTimeout(function () {
                    $mapToggler.show(),
                    $mapPreloader.fadeOut(),
                    $mapPreloaderOverlay.fadeOut(),
                    mapIsLoaded = true;
                },200)

            });

        });

    });

    function YandexReadyHandlerSiteMap() {
        if (!myMap) {
            myMap = new ymaps.Map("map", {
                center: [
                    55.81764532573242, 37.575106041664064
                ],
                zoom: 17,
                controls: [
                    "zoomControl", "routeEditor", "rulerControl"
                ],
                type: "yandex#map"
            }, {suppressMapOpenBlock: true});
            myMap.geoObjects.add(new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.816855509771, 37.574210183853]
                },
                properties: {
                    balloonContent: decodeURIComponent("%3Cp%3E%0A%09%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%20%D0%B4.11%0A%3C%2Fp%3E"),
                    iconCaption: decodeURIComponent("%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%20%D0%B4.11"),
                    hintCaption: decodeURIComponent("%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%20%D0%B4.11")
                }
            }, {preset: "islands#redDotIconWithCaption"}));
            myMap.geoObjects.add(new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.818645030304, 37.574513273471]
                },
                properties: {
                    balloonContent: decodeURIComponent("%3Cp%3E%0A%09%D0%B3.%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BC.%20%D0%A2%D0%B8%D0%BC%D0%B8%D1%80%D1%8F%D0%B7%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%3Cbr%3E%0A%3C%2Fp%3E"),
                    iconCaption: decodeURIComponent("C%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F%20%D0%BC%D0%B5%D1%82%D1%80%D0%BE%20%D0%A2%D0%B8%D0%BC%D0%B8%D1%80%D1%8F%D0%B7%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F"),
                    hintCaption: decodeURIComponent("C%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F%20%D0%BC%D0%B5%D1%82%D1%80%D0%BE%20%D0%A2%D0%B8%D0%BC%D0%B8%D1%80%D1%8F%D0%B7%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F")
                }
            }, {preset: "islands#blueCircleDotIconWithCaption"}));
            myMap.geoObjects.add(new ymaps.GeoObject({
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [
                            55.816872147601, 37.574191979669
                        ],
                        [
                            55.816940105545, 37.574060551427
                        ],
                        [
                            55.816805699736, 37.573419503473
                        ],
                        [
                            55.81694010552, 37.573328308366
                        ],
                        [
                            55.817349360806, 37.575138799451
                        ],
                        [
                            55.817927363132, 37.574817841691
                        ],
                        [
                            55.818532538874, 37.574475426259
                        ],
                        [
                            55.818574822035, 37.574550528111
                        ],
                        [
                            55.818621635453, 37.57452638823
                        ],
                        [55.818644287096, 37.574512977185]
                    ]
                },
                properties: {
                    balloonContent: decodeURIComponent(""),
                    iconCaption: decodeURIComponent("%D0%9A%D0%B0%D0%BA%20%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BE%D1%82%20%D0%BC%D0%B5%D1%82%D1%80%D0%BE"),
                    hintCaption: decodeURIComponent("%D0%9A%D0%B0%D0%BA%20%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BE%D1%82%20%D0%BC%D0%B5%D1%82%D1%80%D0%BE")
                }
            }, {
                fillColor: "#1e98ff",
                strokeColor: "#1e98ff",
                fillOpacity: 0.35,
                strokeOpacity: 1.00000,
                strokeWidth: 4
            }));
            myMap.container.fitToViewport();
            myMap.behaviors.disable('scrollZoom');
            myMap.behaviors.disable('wheel');

            return myMap;
        } else {
            myMap.destroy(); // Деструктор карты
            myMap = null;
        }
    }
  }

  domready(function () {
    exports.init = footerMapSettings
  })
