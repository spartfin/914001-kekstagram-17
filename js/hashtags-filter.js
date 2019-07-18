'use strict';

(function () {
  var MAX_HASHTAGS_LENGTH = 5; // максимальное количество хэштегов
  var MAX_HASHTAG_SIZE = 20; // максимальное количество символов в хэштеге
  var MIN_HASHTAG_SIZE = 2; // минимальное количество символов в хэштеге
  var textHashtags = document.querySelector('.text__hashtags'); // находим поле для добавления хэштегов
  window.textHashtags = textHashtags;
  var imgUploadForm = document.querySelector('.img-upload__form'); // поле для загрузки нового изображения на сайт
  window. imgUploadForm = imgUploadForm;

  var hashtagsValidate = function () {
    var hashtagsArray = textHashtags.value.split(' '); // разбиваем строку в массив
    textHashtags.addEventListener('input', function () {
      textHashtags.setCustomValidity(''); // строка ошибки
    });
    if (hashtagsArray.length > MAX_HASHTAGS_LENGTH) {
      onHashtagsError();
      return 'Нельзя внести больше ' + MAX_HASHTAGS_LENGTH + ' тегов';
    }
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i] === '#') {
        onHashtagsError();
        return 'Хэштег не может состоять из одной решетки';
      } else if (hashtagsArray[i].length === MIN_HASHTAG_SIZE) {
        onHashtagsError();
        return 'Хэштег не может состоять из одной буквы';
      } else if (hashtagsArray[i].charAt(0) !== '#') {
        onHashtagsError();
        return 'Хэштег должен начинаться с символа #';
      } else if (hashtagsArray[i].length > MAX_HASHTAG_SIZE) {
        onHashtagsError();
        return 'Хэштег не может содержать больше ' + MAX_HASHTAG_SIZE + ' символов';
      }
    }
    return '';
  };

  // функция в случаи ошибки
  var hashtagsError = function (errorMessage, entryField) {
    if (errorMessage) {
      entryField.style.outline = '4px solid red'; // рамка в случаи ошибки
      entryField.setCustomValidity(errorMessage); // выводим сообщение ошибки
    }
  };

  // функция валидации при отправке хэштега
  var submitValidate = function () {
    hashtagsError(hashtagsValidate(), textHashtags);
  };

  var onHashtagsError = function () {
    event.preventDefault(); // отменяем событие
  };

  imgUploadForm.addEventListener('submit', submitValidate);

})();
