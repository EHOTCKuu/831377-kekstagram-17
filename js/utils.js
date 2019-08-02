'use strict';

(function () {
  var ESC_BUTTON = 27;

  window.utils = {
    pressEscButton: function (evt) {
      return evt.keyCode === ESC_BUTTON;
    },

    closeElement: function (element) {
      if (element) {
        element.classList.add('hidden');
      }
    },

    clearElement: function (element) {
      document.addEventListener('keydown', element);
    }
  };
})();
