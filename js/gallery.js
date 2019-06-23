'use strict';

(function () {
  var picture = document.querySelector('#picture').content.querySelector('.picture'); // находим шаблон
  var fragment = document.createDocumentFragment(); // создаём контейнер шаблона

  var MIN = 1; // минимальное значение для случайных чисел
  var MIN_LIKES = 15; // минимальное значение для лайков
  var MAX_LIKES = 200; // максимальное значение для лайков

  // массив комментарий
  var commentsList = ['Всё отлично!',
    'В целом всё неплохо',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  // массив имён
  var names = ['Алексей',
    'Иван',
    'Андрей',
    'Кирилл',
    'Ксения',
    'Юлия',
    'Марта',
    'Юрий',
    'Мария',
    'Константин'];

  // массив аватаров
  var avatars = ['img/avatar-1.svg',
    'img/avatar-2.svg',
    'img/avatar-3.svg',
    'img/avatar-4.svg',
    'img/avatar-5.svg',
    'img/avatar-6.svg'];

  // функция возврата случайного адреса фотографии
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // функция возврата случайного комментария
  var getComment = function () {
    var textCommit = [];
    for (var i = 0; i < getRandomNumber(MIN, commentsList.length - 1); i++) { // случайное количество комментарий
      textCommit[i] = commentsList[getRandomNumber(MIN, commentsList.length - 1)];
    }
    return {
      avatar: avatars[getRandomNumber(MIN, avatars.length - 1)],
      message: textCommit,
      name: names[getRandomNumber(MIN, names.length - 1)]
    };
  };

  // функция для создания массива из 25 сгенерированных JS объектов
  var photo = function () {
    var photos = [];

    for (var i = 0; i < 25; i++) {
      photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComment()
      };
      var photoElement = picture.cloneNode(true); // клонирование содержимого шаблона

      photoElement.querySelector('.picture__img').src = photos[i].url;
      photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
      photoElement.querySelector('.picture__comments').textContent = photos[i].comments.message.length;
      fragment.appendChild(photoElement); // добавляем в шаблон
    }
    return fragment;
  };

  window.containerPicture.appendChild(photo()); // добавляем сгенерированные блоки фотографий

})();
