ymaps.ready(init);

function init() {
  var map = new ymaps.Map("map", {
    center: [59.95608374859729,30.323230140747988], // ваши данные
    zoom: 15
  });


  // map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)


  const myPlacemark = new ymaps.Placemark([59.95608374859729,30.323230140747988], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/exclude.svg',
    iconImageSize: [28, 40],
    iconImageOffset: [-3, -42]
  });

  map.geoObjects.add(myPlacemark);

}
