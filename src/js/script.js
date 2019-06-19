// close review
const reviewClose = document.querySelector('.review__close');
const review = document.querySelector('.review');

reviewClose.addEventListener('click', function () {
  review.style.display = 'none';
})