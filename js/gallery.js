'use strict';

(function () {
  var picture = document.querySelector('#picture').content.querySelector('.picture'); // находим шаблон

  var initPhoto = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var photoElement = picture.cloneNode(true);
      photoElement.querySelector('.picture__img').src = arr[i].url;
      photoElement.querySelector('.picture__img').dataset.id = i; // присваиваем id картинке
      photoElement.querySelector('.picture__likes').textContent = arr[i].likes;
      photoElement.querySelector('.picture__comments').textContent = arr[i].comments.length;
      photoElement.addEventListener('click', function (evt) {
        window.showBigPictureImg(evt.target.src, evt.target.alt);
      });
      fragment.appendChild(photoElement);
    }
    return fragment;
  };
  window.initPhoto = initPhoto;

  var successHandler = function (content) {
    window.photoArr = content;
    window.containerPicture.appendChild(initPhoto(window.photoArr));
    window.bigPicture.appendChild(window.createBigPicture(window.photoArr));
  };
  window.successHandler = successHandler;

  // Находим и удаляем все старые картинки посты
  var removeAllPhoto = function () {
    var containerPicture = document.querySelector('.pictures');
    var allPhoto = containerPicture.querySelectorAll('.picture');
    for (var i = 0; i < allPhoto.length; i++) {
      allPhoto[i].parentNode.removeChild(allPhoto[i]);
    }
  };

  window.removeAllPhoto = removeAllPhoto;

  // функция вывода ошибки
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

})();
