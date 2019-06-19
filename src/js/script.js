// close review
var reviewClose = document.querySelector('.review__close'),
    review = document.querySelector('.review'),
    reviewName = document.querySelector('.review__input-name'),
    reviewPlace = document.querySelector('.review__input-place'),
    reviewText = document.querySelector('.review__input-text'),
    reviewSend = document.querySelector('.review-form__button');

// очищаем форму
function clearForm() {
  reviewName.value = '';
  reviewPlace.value = '';
  reviewText.value = '';
}

reviewClose.addEventListener('click', function () {
  review.style.display = 'none';
  clearForm();
});

reviewSend.addEventListener('click', function(e) {
  e.preventDefault();

  clearForm();
});