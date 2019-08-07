'use strict';
(function () {

  var DEFAULT_FILTER = 'none';
  var HEAT_MIN = 1;
  var HEAT_MAX = 3;
  var HIEGHT_PREVIEW = 600;
  var WIDTH_PREVIEW = 600;
  var DEFAULT_EFFECT_VALUE = 100;

  var uploadPreview = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');
  var levelEffect = document.querySelector('.effect-level');
  var levelValue = levelEffect.querySelector('.effect-level__value');
  var levelLine = levelEffect.querySelector('.effect-level__line');
  var levelPin = levelEffect.querySelector('.effect-level__pin');
  var levelDepth = levelEffect.querySelector('.effect-level__depth');
  var img = uploadPreview.querySelector('img');
  var styleEffect = 'none';

  window.effects = {
    effectLevel: levelEffect,
    effectLevelPin: levelPin,
    effectLevelLine: levelLine,
    effectLevelDepth: levelDepth,
    imgUploadPreview: uploadPreview,
    img: img
  };

  var changeEffects = function (evt) {

    uploadPreview.className = '';
    uploadPreview.style.filter = '';
    levelEffect.classList.add('hidden');

    if (evt.target.value !== 'none') {
      levelEffect.classList.remove('hidden');
      levelValue.value = DEFAULT_EFFECT_VALUE;
      levelPin.style.left = '100%';
      levelDepth.style.width = '100%';
      uploadPreview.classList.add('effects__preview--' + evt.target.value);
      img.height = HIEGHT_PREVIEW;
      img.width = WIDTH_PREVIEW;
    }

    styleEffect = evt.target.value;
  };

  effectsList.addEventListener('change', function (evt) {
    changeEffects(evt);
  });

  // Открытие попапа и закрытие попапа по крестику и эскейпу
  var overlayForm = document.querySelector('.img-upload__overlay');
  var cancelForm = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('#upload-file');

  var onPopupEscPress = function (evt) {
    if (window.utils.pressEscButton(evt)) {
      closePopup();

    }
  };

  var openPopup = function () {
    overlayForm.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    addHidden();
    removeFilters();

  };

  var closePopup = function () {
    overlayForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();

  });

  cancelForm.addEventListener('click', function () {
    closePopup();
  });

  // фильтры
  var addHidden = function () {
    levelEffect.classList.add('hidden');
  };

  var removeHidden = function () {
    levelEffect.classList.remove('hidden');
  };

  var removeFilters = function () {
    uploadPreview.classList.remove('effects__preview--' + styleEffect);
    uploadPreview.style.filter = '';
  };


  var getChangeEffects = function (value) {
    removeFilters(); // обнуляем эффект фильтра если есть
    if (value === DEFAULT_FILTER) { // Работает строго, если эффекта нет
      addHidden(); // если нет эффекта на кнопке, то  скрываем строку насыщенности
    } else { // если таргет? находится на эффекте
      levelPin.style.left = '100%'; // позиция бегунка
      levelDepth.style.width = '100%'; // заполнение строки насыщенности
      removeHidden(); // если переключается на эффект, то показываем строку насыщенности
      uploadPreview.classList.add('effects__preview--' + value); // собираем строку
      getLevelPin(value, 1);
    }

    styleEffect = value;

  };

  effectsList.addEventListener('change', function (evt) {
    getChangeEffects(evt.target.value);
  });

  var getLevelPin = function (effect, value) {

    switch (effect) {
      case 'chrome':
        uploadPreview.style.filter = 'grayscale(' + value + ')';
        break;

      case 'sepia':
        uploadPreview.style.filter = 'sepia(' + value + ')';
        break;

      case 'marvin':
        uploadPreview.style.filter = 'invert(' + value * 100 + '%)';
        break;

      case 'phobos':
        uploadPreview.style.filter = 'blur(' + value * 3 + 'px)';
        break;

      case 'heat':
        uploadPreview.style.filter = 'brightness(' + (HEAT_MIN + (HEAT_MAX - HEAT_MIN) * value) + ')';

    }

  };

  levelPin.addEventListener('mouseup', function () {
    var value = (levelPin.offsetLeft / levelLine.clientWidth).toFixed(2);
    getLevelPin(styleEffect, value);

  });
})();
