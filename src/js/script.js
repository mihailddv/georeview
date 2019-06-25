var reviewClose = document.querySelector('.review__close'),
    review = document.querySelector('.review'),
    reviewName = document.querySelector('.review__input-name'),
    reviewPlace = document.querySelector('.review__input-place'),
    reviewText = document.querySelector('.review__input-text'),
    reviewItemName = document.querySelector('.review__item-user'),
    reviewItemDate = document.querySelector('.review__item-date'),
    reviewItemPlace = document.querySelector('.review__item-position'),
    reviewItemText = document.querySelector('.review__item-text');
    
    // reviewSend = document.querySelector('.review-form__button');

// очищаем форму
function clearForm() {
  reviewName.value = '';
  reviewPlace.value = '';
  reviewText.value = '';
}

function addReview() {
  let date = new Date(),
      dateNow = [date.getDate(), date.getMonth(), date.getFullYear()].join('.');

  reviewNameValue = reviewName.value;
  reviewPlaceValue = reviewPlace.value;
  reviewTextValue = reviewText.value;

  reviewItemName.innerHTML = reviewNameValue;
  reviewItemPlace.innerHTML = reviewPlaceValue;
  reviewItemText.innerHTML = reviewTextValue;
  reviewItemDate.innerHTML = dateNow;
}

reviewClose.addEventListener('click', function () {
  review.style.display = 'none';
  clearForm();
});
