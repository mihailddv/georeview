ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 14
  });

  myMap.events.add('click', function () {
    let review = document.querySelector('.review');

    review.style.display = 'block';
  });
}