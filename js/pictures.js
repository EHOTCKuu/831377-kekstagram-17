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
  var MAX_COMMENTS = 5;


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
    var photosCopy = photos.slice(-NEW_PICTURES);
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

  window.backend.load(showLoadSuccess);

  var onFilterButtonClickDebounce = debounce(onFilterButtonClick);

  // Обновляем отрисовку картинок в зависимости от кнопок, с учетомдребезга в полсекунды
  filterPopular.addEventListener('click', onFilterButtonClickDebounce);
  filterDiscussed.addEventListener('click', onFilterButtonClickDebounce);
  filterNew.addEventListener('click', onFilterButtonClickDebounce);

  // Большая картинка вылезаить
  var remainingComments;
  var commentsQuantity = {};
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = document.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  };

  var createComment = function (pictures) {

    var listItem = makeElement('li', 'social__comment');
    var image = makeElement('img', 'social__picture');

    image.src = pictures.avatar;
    listItem.appendChild(image);

    var commentText = makeElement('p', 'social__text');
    commentText.textContent = pictures.message;
    listItem.appendChild(commentText);

    return listItem;
  };

  var renderComments = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });

    socialComments.appendChild(fragment);

    updateCommentsContent(commentsQuantity.currentCount, commentsQuantity.totalCount);
  };

  var getBigPicture = function (photos) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = photos.url;
    bigPicture.querySelector('.likes-count').textContent = photos.likes;
    bigPicture.querySelector('.social__caption').textContent = photos.description;
    remainingComments = photos.comments.slice(0);
    commentsQuantity.totalCount = remainingComments.length;
    socialComments.innerHTML = '';

    renderComments(prepareComments(remainingComments));
  };

  var prepareComments = function (comments) {
    if (comments.length > MAX_COMMENTS) {
      commentsLoader.classList.remove('hidden');
      commentsQuantity.currentCount = commentsQuantity.totalCount - comments.length + MAX_COMMENTS;

      return comments.splice(0, MAX_COMMENTS);
    }

    commentsLoader.classList.add('hidden');
    commentsQuantity.currentCount = commentsQuantity.totalCount;

    return comments.splice(0, comments.length);
  };

  var updateCommentsContent = function (currentCount, totalCount) {
    bigPicture.querySelector('.social__comment-count').textContent = currentCount + ' из '
      + totalCount + ' комментариев';
  };

  var loadCommentsClickHandler = function () {
    renderComments(prepareComments(remainingComments));
  };

  commentsLoader.addEventListener('click', loadCommentsClickHandler);

  var showBigPhoto = function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('picture__img')) {
      var attribute = evt.target.getAttribute('src');
      for (var i = 0; i < picturesBlock.length; i++) {
        if (picturesBlock[i].url === attribute) {
          getBigPicture(picturesBlock[i]);
        }
      }
    }
  };

  var openBigPicture = function (evt) {
    var target = evt.target;
    var picture = target.closest('.picture');
    if (!picture) {
      return;
    }
    showBigPhoto(evt);
  };

  picturesElement.addEventListener('click', openBigPicture);

  // Закрываем попап
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var uploadEscPress = function (evt) {
    if (window.utils.pressEscButton(evt)) {
      window.utils.closeElement(bigPicture);
    }
  };

  window.utils.clearElement(uploadEscPress);

  bigPictureCancel.addEventListener('click', function () {
    window.utils.closeElement(bigPicture);
  });
})();


