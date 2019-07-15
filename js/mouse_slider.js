'use strict';
(function () {
  var levelEffect = document.querySelector('.effect-level');
  var levelLine = levelEffect.querySelector('.effect-level__line');
  var levelPin = levelEffect.querySelector('.effect-level__pin');
  var levelDepth = levelEffect.querySelector('.effect-level__depth');

  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = levelPin.getBoundingClientRect().left + levelPin.offsetWidth / 2;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      var pinLeft = levelPin.offsetLeft - shift;

      var lineLeft = levelLine.getBoundingClientRect().left;
      var lineRight = levelLine.getBoundingClientRect().right;
      if (startCoords <= lineLeft) {
        pinLeft = 0;
      } else if (startCoords >= lineRight) {
        pinLeft = levelLine.clientWidth;
      }

      levelPin.style.left = pinLeft + 'px';
      levelDepth.style.width = pinLeft + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
