'use strict';

(function () {
  var MAX_SCALE_VALUE = 100;
  var ESC_BUTTON = 27;

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectNone = imgUploadOverlay.querySelector('#effect-none');

  uploadFile.addEventListener('change', function () {
    effectNone.checked = true;
    imgUploadOverlay.classList.remove('hidden');
    window.preview.effectLevel.classList.add('hidden');
    window.preview.imgUploadPreview.style.transform = '';
    window.preview.imgUploadPreview.style.filter = '';
    window.preview.scaleControlValue.value = MAX_SCALE_VALUE + '%';
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
    window.preview.imgUploadPreview.className = 'img-upload__preview';
  };
  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      closePopup(imgUploadOverlay);
    }
  };
  document.addEventListener('keydown', onImgUploadEscPress);
  uploadCancel.addEventListener('click', function () {
    closePopup(imgUploadOverlay);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
  });

  // Хэштэги
  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
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
    if (evt.keyCode === ESC_BUTTON) {
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
    imgUploadOverlay.classList.add('hidden');
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
    imgUploadOverlay.classList.add('hidden');
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
    window.upload(new FormData(imgUploadForm), onSuccessSave, onErrorSave);
  });
})();
