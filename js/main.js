'use strict';

var picture = document.querySelector('#picture').content.querySelector('.picture'); // находим шаблон
var containerPicture = document.querySelector('.pictures'); // блок всего содержимого фотографий
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

containerPicture.appendChild(photo()); // добавляем сгенерированные блоки фотографий

var uploadFile = document.querySelector('#upload-file'); // находим поле для загрузки фотографии
var uploadCancel = document.querySelector('#upload-cancel'); // находим кнопку закрытия редактирования фотографии
var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования фотографии
var ESC_KEYCODE = 27;

// функция открытия попапа
var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
};

// фунция закрытия попапа
var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
};

// зоказываем форму редактирования изображения
uploadFile.addEventListener('click', function () {
  openPopup();
});

// закрываем форму редактирования изображения
uploadCancel.addEventListener('click', function () {
  closePopup();
});

// закрываем форму редактирования изображения через Esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
  }
});

// накладываем эффекты на изображение
var effectNone = document.querySelector('#effect-none');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');
var imgUploadPreview = document.querySelector('.img-upload__preview'); // предварительный просмотр фотографии

effectNone.addEventListener('click', function () {
  imgUploadPreview.classList.remove();
  imgUploadPreview.classList.add('effects__preview--none');
});

effectChrome.addEventListener('click', function () {
  imgUploadPreview.classList.remove();
  imgUploadPreview.classList.add('effects__preview--chrome');
});

effectSepia.addEventListener('click', function () {
  imgUploadPreview.classList.remove();
  imgUploadPreview.classList.add('effects__preview--sepia');
});

effectMarvin.addEventListener('click', function () {
  imgUploadPreview.classList.remove();
  imgUploadPreview.classList.add('effects__preview--marvin');
});

effectPhobos.addEventListener('click', function () {
  imgUploadPreview.classList.remove();
  imgUploadPreview.classList.add('effects__preview--phobos');
});

effectHeat.addEventListener('click', function () {
  imgUploadPreview.classList.remove();
  imgUploadPreview.classList.add('effects__preview--heat');
});

// Интенсивность эффекта
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');

// тут что то совсем не получается, не пойму я как с этим ползунком
var changeIntensityEffect = function () {
  effectLevelValue.value = (effectLevelPin.offsetLeft / effectLevelLine.clientWidth).toFixed(1);

  if (imgUploadPreview.classList[0] === 'effects__preview--chrome') {
    imgUploadPreview.style.filter = 'grayscale(' + effectLevelValue.value + ')';
  } else if (
    imgUploadPreview.classList[0] === 'effects__preview--sepia') {
    imgUploadPreview.style.filter = 'sepia(' + effectLevelValue.value + ')';
  } else if (
    imgUploadPreview.classList[0] === 'effects__preview--marvin') {
    imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value * 100 + '%)';
  } else if (
    imgUploadPreview.classList[0] === 'effects__preview--phobos') {
    imgUploadPreview.style.filter = 'blur(' + effectLevelValue.value * 3 + 'px)';
  } else if (
    imgUploadPreview.classList[0] === 'effects__preview--heat') {
    imgUploadPreview.style.filter = 'brightness(' + effectLevelValue.value * 3 + ')';
  }
};

effectLevelPin.addEventListener('mouseup', function () {
  changeIntensityEffect();
});

// изменяем масштаба
var MIN_SCALE = 0; // минимальное значение масштаба
var MAX_SCALE = 100; // максимальное значение масштаба
var STEP_SCALE = 25; // шаг мвсштаба
var scaleCntrolValue = document.querySelector('.scale__control--value'); // само значение
var scaleControlSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшения размера
var scaleControlBigger = document.querySelector('.scale__control--bigger'); // кнопка увеличение размера

// функция уменьшения размера
var outZoom = function () {
  var scaleSmaller = parseInt(scaleCntrolValue.value, 10) - STEP_SCALE;

  if (scaleSmaller <= MIN_SCALE) {
    scaleSmaller = MIN_SCALE;
  }
  scaleCntrolValue.value = scaleSmaller + '%';

  imgUploadPreview.style.transform =
    'scale(' + scaleSmaller / 100 + ')';
};

// функция увеличение размера
var inZoom = function () {
  var scaleBigger = parseInt(scaleCntrolValue.value, 10) + STEP_SCALE;

  if (scaleBigger >= MAX_SCALE) {
    scaleBigger = MAX_SCALE;
  }
  scaleCntrolValue.value = scaleBigger + '%';

  imgUploadPreview.style.transform =
    'scale(' + scaleBigger / 100 + ')';
};

scaleControlSmaller.addEventListener('click', function () {
  outZoom();
});

scaleControlBigger.addEventListener('click', function () {
  inZoom();
});

