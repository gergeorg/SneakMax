  ymaps.ready(init);
  function init(){
    const myMap = new ymaps.Map("map", {
      center: [60.19536306383422,29.72220749999997],
      zoom: 17
    });

    const myPlacemark = new ymaps.Placemark([60.19536306383422,29.72220749999997], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/Exclude.svg',
      iconImageSize: [28, 40],
      iconImageOffset: [-3, -42]
    });

  myMap.geoObjects.add(myPlacemark);
  }
