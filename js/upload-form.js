'use strict';

(function () {
  var main = document.querySelector('main');

  // Отправляет форму и проверяет ответ сервера
  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    var URL_POST = 'https://js.dump.academy/kekstagram';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  // cбрасывает введённые ранее данные
  var resetUpload = function () {
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

  // Отправка формы нажатием на кнопку
  window.imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var submitResult = window.submitValidate();
    if (!submitResult) {
      var newFormData = new FormData(window.imgUploadForm);
      upload(newFormData, onSucces);
    }
  });

})();

