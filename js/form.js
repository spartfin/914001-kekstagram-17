'use strict';

(function () {
  var containerPicture = document.querySelector('.pictures'); // блок всего содержимого фотографий
  window.containerPicture = containerPicture;
  var imgUploadOverlay = containerPicture.querySelector('.img-upload__overlay'); // форма редактирования фотографии
  window.imgUploadOverlay = imgUploadOverlay;
  var uploadFile = containerPicture.querySelector('#upload-file'); // находим поле для загрузки фотографии
  window.uploadFile = uploadFile;
  var uploadCancel = containerPicture.querySelector('#upload-cancel'); // находим кнопку закрытия редактирования фотографии
  var textDescription = containerPicture.querySelector('.text__description'); // находим поле ввода комментария
  window.textDescription = textDescription;
  var ESC_KEYCODE = 27;
  window.ESC_KEYCODE = ESC_KEYCODE;

  // функция не даёт закрыть полее ввода комментария если оно в фокусе
  var onPopupEscPress = function (evt) {
    if (textDescription === document.activeElement || window.textHashtags === document.activeElement) {
      return evt;
    } else {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    }
    return evt;
  };

  // функция открытия попапа
  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    containerPicture.addEventListener('keydown', onPopupEscPress);
  };

  // фунция закрытия попапа
  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    window.containerPicture.removeEventListener('keydown', onPopupEscPress);
  };
  window.closePopup = closePopup;

  // открываем форму редактирования изображения
  uploadFile.addEventListener('click', function () {
    openPopup();
  });

  // закрываем форму редактирования изображения
  uploadCancel.addEventListener('click', function () {
    closePopup();
  });
})();
