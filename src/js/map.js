ymaps.ready(init);



function createPlacemark(coords) {
  return new ymaps.Placemark(coords, {
      // iconCaption: 'поиск...'
  }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
  });
}

var myPlacemark;

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 14
  });


  myMap.events.add('click', function (e) {
    // показываем элемент
    var review = document.querySelector('.review'),
        reviewAddress = document.querySelector('.review__location');

    review.style.display = 'block';

    // Получение координат щелчка
    var coords = e.get('coords');

    // Получаем позицию клика
    var pagePixels = e.get('pagePixels');
    review.style.left = pagePixels[0]+"px";
    review.style.top = pagePixels[1]+"px";

    myPlacemark = createPlacemark(coords);
    myMap.geoObjects.add(myPlacemark);


    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      var address = firstGeoObject.properties.get('name')+", "+firstGeoObject.properties.get('description');

      // адрес в заголовок формы       
      reviewAddress.innerText = address;
    });
    
  });
}

const reviewSend = document.querySelector('.review-form__button');

reviewSend.addEventListener('click', function(e) {
  e.preventDefault();  

  addReview();

  clearForm();
});

let marks = {
  '55.66-37.54': [
      {
          name: 'Тест',
          place: 'Тест',
          comment: 'Тест',
          date: '01.01.2019'
      }
  ]
};

function loadReviews() {
  let reviewsMap = localStorage.getItem('georeviews') || '{}';

  return JSON.parse(reviewsMap);
}

localStorage.setItem('georeviews', JSON.stringify(marks));

// let reviewsMap = loadReviews();

loadReviews();