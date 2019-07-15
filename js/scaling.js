'use strict';
(function () {

  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;

  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  var uploadPreview = document.querySelector('.img-upload__preview');

  controlValue.value = MAX_SCALE + '%';

  var changeSize = function (value) {
    uploadPreview.style.transform = 'scale' + '(' + value / 100 + ')';
  };

  var changeScale = function (step) {
    var control = parseInt(controlValue.value, 10);
    if (control + step <= MAX_SCALE && control + step >= MIN_SCALE) {
      var amount = control + step;
      controlValue.value = amount + '%';
      changeSize(amount);
    }
  };

  controlSmaller.addEventListener('click', function () {
    changeScale(-1 * SCALE_STEP);
  });

  controlBigger.addEventListener('click', function () {
    changeScale(SCALE_STEP);
  });
})();
