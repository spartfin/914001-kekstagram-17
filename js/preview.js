'use strict';

(function () {
  // изменяем масштаба
  var MIN_SCALE = 0; // минимальное значение масштаба
  var MAX_SCALE = 100; // максимальное значение масштаба
  var STEP_SCALE = 25; // шаг масштаба
  var scaleCntrolValue = window.imgUploadOverlay.querySelector('.scale__control--value'); // само значение
  var scaleControlSmaller = window.imgUploadOverlay.querySelector('.scale__control--smaller'); // кнопка уменьшения размера
  var scaleControlBigger = window.imgUploadOverlay.querySelector('.scale__control--bigger'); // кнопка увеличение размера

  // функция уменьшения размера
  var outZoom = function () {
    var scaleSmaller = parseInt(scaleCntrolValue.value, 10) - STEP_SCALE;

    if (scaleSmaller <= MIN_SCALE) {
      scaleSmaller = MIN_SCALE;
    }
    scaleCntrolValue.value = scaleSmaller + '%';

    window.imgUploadPreview.style.transform =
    'scale(' + scaleSmaller / 100 + ')';
  };

  // функция увеличение размера
  var inZoom = function () {
    var scaleBigger = parseInt(scaleCntrolValue.value, 10) + STEP_SCALE;

    if (scaleBigger >= MAX_SCALE) {
      scaleBigger = MAX_SCALE;
    }
    scaleCntrolValue.value = scaleBigger + '%';

    window.imgUploadPreview.style.transform =
    'scale(' + scaleBigger / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    outZoom();
  });

  scaleControlBigger.addEventListener('click', function () {
    inZoom();
  });
})();
