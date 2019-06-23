'use strict';

(function () {
  var imgUploadPreview = window.imgUploadOverlay.querySelector('.img-upload__preview'); // предварительный просмотр фотографии
  window.imgUploadPreview = imgUploadPreview;
  var effectLevelValue = window.imgUploadOverlay.querySelector('.effect-level__value');
  var effectLevelLine = window.imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelPin = window.imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level');
  var effectLeveleDepth = document.querySelector('.effect-level__depth');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var pinPositionDefault = 453;

  // функция интенсивности эффекта
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

  // функция сбрасывает значение эффектов к дефолтным
  var resetEffect = function () {
    effectLevelValue.setAttribute('value', 100);
    effectLevelPin.style.left = pinPositionDefault + 'px';
    effectLeveleDepth.style.width = pinPositionDefault + 'px';
    imgUploadPreview.style = '';
  };

  // упростил и усовершенствовал предыдущий код наложение эффектов
  var setClassEffects = function (evt) {
    imgUploadPreview.className = '';
    effectLevel.classList.remove('hidden');
    var effect = evt.target.value;
    imgUploadPreview.classList.add('effects__preview--' + effect);

    if (effect === 'none') {
      effectLevel.classList.add('hidden');
    }
  };

  var clickEffectToggle = function (effectsToggle) {
    effectsToggle.addEventListener('change', function (evt) {
      setClassEffects(evt);
      resetEffect();
    });
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    var effectsToggle = effectsRadio[i];
    clickEffectToggle(effectsToggle);
  }

  // работа с захватом и движением пина
  var pinCoords = function (evt) {
    var pinPosition = evt.target.offsetLeft;
    var maxEffectLevel = effectLevelLine.offsetWidth;

    effectLevelValue.setAttribute('value', Math.round(pinPosition * 100 / maxEffectLevel));
    changeIntensityEffect(effectLevelValue.value);
  };


  effectLevelPin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var dragX = (effectLevelPin.offsetLeft - shift.x);
      if (dragX <= 0) {
        dragX = 0;
      } else if (dragX >= effectLevelLine.offsetWidth) {
        dragX = effectLevelLine.offsetWidth;
      }
      effectLevelPin.style.left = dragX + 'px';
      effectLeveleDepth.style.width = dragX + 'px';
      pinCoords(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      pinCoords(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
