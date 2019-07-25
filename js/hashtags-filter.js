'use strict';

(function () {
  var MAX_HASHTAGS_LENGTH = 5; // максимальное количество хэштегов
  var MAX_HASHTAG_SIZE = 20; // максимальное количество символов в хэштеге
  var MIN_HASHTAG_SIZE = 2; // минимальное количество символов в хэштеге
  var textHashtags = document.querySelector('.text__hashtags'); // находим поле для добавления хэштегов
  window.textHashtags = textHashtags;
  var imgUploadForm = document.querySelector('.img-upload__form'); // поле для загрузки нового изображения на сайт
  window.imgUploadForm = imgUploadForm;

  var hashtagsValidate = function (textHashtagsValue) {
    var hashtagsArray = textHashtagsValue.split(' '); // разбиваем строку в массив

    textHashtags.addEventListener('input', function () {
      textHashtags.setCustomValidity(''); // строка ошибки
      textHashtags.style.outline = 'none';
    });
    if (hashtagsArray.length > MAX_HASHTAGS_LENGTH) {
      return 'Нельзя внести больше ' + MAX_HASHTAGS_LENGTH + ' тегов';
    }
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i] === '#') {
        return 'Хэштег не может состоять из одной решетки';
      } else if (hashtagsArray[i].length === MIN_HASHTAG_SIZE) {
        return 'Хэштег не может состоять из одной буквы';
      } else if (hashtagsArray[i].charAt(0) !== '#') {
        return 'Хэштег должен начинаться с символа #';
      } else if (hashtagsArray[i].length > MAX_HASHTAG_SIZE) {
        return 'Хэштег не может содержать больше ' + MAX_HASHTAG_SIZE + ' символов';
      } else if (hashtagsArray.indexOf(hashtagsArray[i]) !== i) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      } else if (hashtagsArray.length > 5) {
        return 'Нельзя указать больше пяти хэш-тегов';
      } else if (hashtagsArray[i].indexOf('#', 1) >= 1) {
        return 'Хэш-теги разделяются пробелами';
      }
    }
    return false;
  };

  // функция валидации при отправке хэштега
  var submitValidate = function () {
    var textHashtagsValue = textHashtags.value;
    var errorMessage = hashtagsValidate(textHashtagsValue);
    if (errorMessage) {
      textHashtags.style.outline = '4px solid red'; // рамка в случаи ошибки
      textHashtags.setCustomValidity(errorMessage); // выводим сообщение ошибки
      return true;
    }
    return false;
  };

  window.submitValidate = submitValidate;
})();
