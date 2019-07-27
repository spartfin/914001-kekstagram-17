'use strict';

(function () {
  var main = document.querySelector('main');

  // cбрасывает введённые ранее данные
  var resetUpload = function () {
    window.imgUploadPreviewLoad.src = '';
    window.textHashtags.value = '';
    window.textDescription.value = '';
    window.uploadFile.value = '';
  };

  // показываем диалоговое окно
  var openWindow = function (dialogWindow) {
    var successWindow = document.querySelector('#' + dialogWindow).content.querySelector('.' + dialogWindow);

    main.appendChild(successWindow);
  };

  // удаляем диалоговое окно
  var closeWindow = function (dialogWindow) {
    var dialog = main.querySelector('.' + dialogWindow);
    var dialogButton = dialog.querySelectorAll('.' + dialogWindow + '__button');

    var onEscPress = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        dialog.remove();
      }
      return evt;
    };

    var dialogElementRemove = function () {
      dialog.remove();
    };

    // если клик не по окну
    var dialogRemove = function (evt) {
      if (!evt.target.closest('.' + dialogWindow + '__inner')) {
        dialogElementRemove();
      }
    };

    // закрывает на ESC
    document.addEventListener('keydown', onEscPress);
    // закрывает по клику на любую область экрана
    dialog.addEventListener('click', dialogRemove);
    // закрывает на кнопки
    dialogButton.forEach(function (button) {
      button.addEventListener('click', dialogElementRemove);
    });
  };

  // функция успешной отправки
  var onSucces = function () {
    window.closePopup();
    resetUpload();
    openWindow('success');
    closeWindow('success');
  };

  // функция ошибки отправки
  var onError = function () {
    window.closePopup();
    resetUpload();
    openWindow('error');
    closeWindow('error');
  };
  window.onError = onError;

  // Отправка формы нажатием на кнопку
  window.imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var submitResult = window.submitValidate();
    if (!submitResult) {
      var newFormData = new FormData(window.imgUploadForm);
      window.upload(newFormData, onSucces);
    }
  });

})();

