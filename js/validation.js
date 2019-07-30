'use strict';
(function () {
  var commentText = document.querySelector('.text__description');

  commentText.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onPopupEscPress);
  }); // удаляем функцию назначения закрытия попапа при фокусе формы комментария.

  commentText.addEventListener('blur', function () {
    document.addEventListener('keydown', window.onPopupEscPress);
  }); // удаляем функцию назначения закрытия попапа при потере фокуса с формы комментария.

})();
