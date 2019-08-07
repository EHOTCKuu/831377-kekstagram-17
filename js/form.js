'use strict';

(function () {
  var MAX_SCALE_VALUE = 100;

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectNone = imgUploadOverlay.querySelector('#effect-none');

  uploadFile.addEventListener('change', function () {
    effectNone.checked = true;
    imgUploadOverlay.classList.remove('hidden');
    window.effects.effectLevel.classList.add('hidden');
    window.effects.imgUploadPreview.style.transform = '';
    window.effects.imgUploadPreview.style.filter = '';
    window.scaling.scaleControlValue.value = MAX_SCALE_VALUE + '%';
  });
  // Закрываем форму
  var uploadCancel = document.querySelector('#upload-cancel');
  var textDescription = imgUploadOverlay.querySelector('.text__description');
  var textHashtags = document.querySelector('.text__hashtags');

  var closePopup = function (element) {
    element.classList.add('hidden');
    uploadFile.value = '';
    effectNone.checked = true;
    textHashtags.value = '';
    textDescription.value = '';
    window.effects.imgUploadPreview.className = 'img-upload__preview';
  };
  var onImgUploadEscPress = function (evt) {
    if (window.utils.pressEscButton(evt)) {
      closePopup(imgUploadOverlay);
    }
  };

  window.utils.clearElement(onImgUploadEscPress);

  uploadCancel.addEventListener('click', function () {
    closePopup(imgUploadOverlay);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  textDescription.addEventListener('blur', function () {
    window.utils.clearElement(onImgUploadEscPress);
  });

  // Хэштэги
  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    window.utils.clearElement(onImgUploadEscPress);
  });

  var imgUploadForm = document.querySelector('.img-upload__form');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var main = document.querySelector('main');

  var onEscKeydown = function (evt) {
    if (window.utils.pressEscButton(evt)) {
      closeModal();
    }
  };

  var closeModal = function () {
    var messageElement = main.querySelector('.success, .error');
    if (messageElement) {
      messageElement.remove();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  var resetForm = function () {
    textHashtags.value = '';
    uploadFile.value = null;
    textDescription.value = '';
  };

  var onSuccessSave = function () {
    resetForm();
    window.utils.closeElement(imgUploadOverlay);
    var element = successTemplate.cloneNode(true);
    main.appendChild(element);

    element.querySelector('.success__button').addEventListener('click', function () {
      closeModal();
    });

    element.addEventListener('click', function (evt) {
      if (evt.target === element) {
        closeModal();
      }
    });

    document.addEventListener('keydown', onEscKeydown);
  };

  var onErrorSave = function () {
    resetForm();
    window.utils.closeElement(imgUploadOverlay);
    var element = errorTemplate.cloneNode(true);
    main.appendChild(element);

    element.querySelector('.error__button').addEventListener('click', function (evt) {
      evt.stopPropagation();
      closeModal();
    });

    element.addEventListener('click', function (evt) {
      if (evt.target === element) {
        closeModal();
      }
    });

    document.addEventListener('keydown', onEscKeydown);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.backend.upload(new FormData(imgUploadForm), onSuccessSave, onErrorSave);
  });
})();
