'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture'); // полноэкранный показ изображения
  window.bigPicture = bigPicture;
  var bigPictureImg = bigPicture.querySelector('.big-picture__img').firstElementChild; // просмотр и адрес изображения (выбираем первый элемент по тз)
  var likesCount = bigPicture.querySelector('.likes-count'); // количество лайков
  var commentsCount = bigPicture.querySelector('.comments-count'); // количество комментариев
  var socialComment = bigPicture.querySelectorAll('.social__comment'); // список комментариев под фотографией
  var socialCaption = bigPicture.querySelector('.social__caption'); // описание фотографии

  bigPicture.classList.remove('hidden'); // показываем полноэкранный показ изображения

  // заполняем его данными из первого элемента массива
  var createBigPicture = function (arr) {
    bigPictureImg.src = arr[0].url; // первая картинка из массива
    likesCount.textContent = arr[0].likes; // количество лайков из первого элемента
    commentsCount.textContent = arr[0].comments.length; // количество лайков из первого элемента
    socialComment.forEach(function (element, i) { // проходим методом forEach по блоку комментариев и выводим случайный аватар с комментарием
      element.querySelector('.social__picture').src = arr[0].comments[i].avatar; // случайный аватар из первого элемента массива
      element.querySelector('.social__text').textContent = arr[0].comments[i].message; // случайный коментарий из первого элемента массива
    });
    socialCaption.textContent = arr[0].description; // описание фотографии
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden'); // прячем блоки счётчика комментариев
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden'); // прячем блоки загрузки новых комментариев
  };

  window.createBigPicture = createBigPicture;

})();

