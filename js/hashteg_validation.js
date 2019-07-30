'use strict';

(function () {
  var HASHTEG_MAX_LENGTH = 5;
  var HASHTEG_MAX_SIZE = 20;
  var HASHTEG_MIN_SIZE = 2;
  var SPACE = 1;
  var textHashtegs = document.querySelector('.text__hashtags');

  var validateFormData = function () {
    var errorMessage;
    var hashtegValue = textHashtegs.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashtegArray = hashtegValue ? hashtegValue.split(' ') : [];

    if (hashtegArray.length > HASHTEG_MAX_LENGTH) {
      errorMessage = 'Нельзя указать больше пяти хэш-тегов';
    }
    hashtegArray.forEach(function (hash) {
      var hashtagArrayCopy = hashtegArray.slice();
      var repeatedHashtags = hashtagArrayCopy.filter(function (element, indexElement, array) {
        return indexElement !== array.indexOf(element) || indexElement !== array.lastIndexOf(element);
      });
      var gridArray = hash.match(/#/g);
      var gridCount = gridArray ? gridArray.length : 0;
      if (hash.charAt(0) !== '#') {
        errorMessage = 'Хэш-тег начинается с символа # (решётка)';
      } else if (hash.charAt(0) === '#' && hash.length < HASHTEG_MIN_SIZE) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки или одного символа';
      } else if (hash.charAt(0) === '#' && gridCount > SPACE) {
        errorMessage = 'Хэш-теги разделяются пробелами';
      } else if (hash.length > HASHTEG_MAX_SIZE) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      } else if (repeatedHashtags.length > 0) {
        errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
      }
    });

    if (errorMessage) {
      textHashtegs.setCustomValidity(errorMessage);
      textHashtegs.style.border = '2px solid red';
    } else {
      textHashtegs.style.border = '';
      textHashtegs.setCustomValidity('');
    }
  };

  textHashtegs.addEventListener('input', validateFormData);
})();
