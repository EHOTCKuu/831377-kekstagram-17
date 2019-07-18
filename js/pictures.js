'use strict';
(function () {
  var getImage = function (result) {
    var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var resultElement = templatePicture.cloneNode(true);
    resultElement.querySelector('.picture__img').src = result.url;
    resultElement.querySelector('.picture__likes').textContent = result.likes;
    resultElement.querySelector('.picture__comments').textContent = result.comments.length;
    return resultElement;
  };
  window.load(function (picturesList) {
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesList.length; i++) {
      fragment.appendChild(getImage(picturesList[i]));
    }
    pictures.appendChild(fragment);
  });
})();
