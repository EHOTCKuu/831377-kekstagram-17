'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var filtersButton = imgFilters.querySelectorAll('button');
  var picturesBlock = [];
  var NEW_PICTURES = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

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

  var insertPhoto = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getImage(photos[i]));
    }
    picturesElement.appendChild(fragment);
  };

  var clearPictures = function () {
    picturesElement.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var changeFilter = function (btn) {
    filtersButton.forEach(function (btnItem) {
      btnItem.classList.remove('img-filters__button--active');
    });
    btn.classList.add('img-filters__button--active');
  };

  var showDiscussedFotos = function (photos) {
    var photosCopy = photos.slice();
    photosCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    insertPhoto(photosCopy);
  };


  var shuffleArray = function (photos) {
    var photosCopy = photos
      .sort(function () {
        return Math.random() - 0.5;
      });
    return photosCopy;
  };

  var showNewFotos = function (photos) {
    var photosCopy = photos.slice(NEW_PICTURES);
    shuffleArray(photosCopy);
    insertPhoto(photosCopy);
  };

  var showLoadSuccess = function (photos) {
    picturesBlock = photos;
    imgFilters.classList.remove('img-filters--inactive');
    insertPhoto(picturesBlock);
    return picturesBlock;
  };

  var onFilterButtonClick = function (evt) {
    clearPictures();
    changeFilter(evt.target);
    var id = evt.target.id;
    switch (id) {
      case 'filter-popular':
        insertPhoto(picturesBlock);
        break;
      case 'filter-new':
        showNewFotos(picturesBlock);
        break;
      case 'filter-discussed':
        showDiscussedFotos(picturesBlock);
    }
  };

  // функция антидребезга
  var debounce = function (fn) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fn.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.load(showLoadSuccess);

  var onFilterButtonClickDebounce = debounce(onFilterButtonClick);

  // Обновляем отрисовку картинок в зависимости от кнопок, с учетомдребезга в полсекунды
  filterPopular.addEventListener('click', onFilterButtonClickDebounce);
  filterDiscussed.addEventListener('click', onFilterButtonClickDebounce);
  filterNew.addEventListener('click', onFilterButtonClickDebounce);
})();


