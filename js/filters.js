'use strict';

(function () {
  var PHOTOS_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');

  // Новые — 10 случайных, не повторяющихся фотографий;
  var renderNewPhotos = function (arr) {
    var copyArray = arr.slice();
    var sortedArray = copyArray.sort(window.utils.compareRandom);
    return sortedArray.slice(0, PHOTOS_COUNT);
  };

  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев
  var sortComments = function (left, right) {
    var equalValue = window.utils.compareNumbers(left.comments.length, right.comments.length);

    if (left.comments.length === right.comments.length) {
      equalValue = window.utils.compareNumbers(left.likes, right.likes);
    }
    return equalValue;
  };

  var renderCommitPhotos = function (arr) {
    var copyArray = arr.slice();
    return copyArray.sort(sortComments);
  };

  filterPopular.addEventListener('click', function () {
    window.removeAllPhoto();
    var initialPhoto = window.initPhoto(window.photoArr);
    window.containerPicture.appendChild(initialPhoto);
    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  });

  filterNew.addEventListener('click', function () {
    window.removeAllPhoto();
    // Функция устранения "дребезга", в других вкладках не увидел смысла вставлять
    window.debounce(function () {
      var renderPhotosNew = renderNewPhotos(window.photoArr);
      var initialPhoto = window.initPhoto(renderPhotosNew);
      window.containerPicture.appendChild(initialPhoto);
    });
    filterNew.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  });

  filterDiscussed.addEventListener('click', function () {
    window.removeAllPhoto();
    var renderPhotosCommit = renderCommitPhotos(window.photoArr);
    var initialPhoto = window.initPhoto(renderPhotosCommit);
    window.containerPicture.appendChild(initialPhoto);
    filterDiscussed.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
  });

})();
