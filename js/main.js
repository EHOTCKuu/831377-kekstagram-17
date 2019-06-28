'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артём', 'Игорь', 'Трололоша', 'Андрей', 'Константин', 'Василий', 'Саша', 'Ермолай', 'Гербарий'];
var AMOUNT_LIKES_MIN = 15;
var AMOUNT_LIKES_MAX = 200;
var AMOUNT_AVATARS_MAX = 6;
var AMOUNT_AVATARS_MIN = 1;
var AMOUNT_IMAGES_MAX = 25;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 9;
var ESC_KEYCODE = 27;
var SCALE_STEP = 25;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var DEFAULT_FILTER = 'none';
var HEAT_MIN = 1;
var HEAT_MAX = 3;

// привязываем эффект к Radiobutton
var uploadPreview = document.querySelector('.img-upload__preview');
var effectsList = document.querySelector('.effects__list');
var levelEffect = document.querySelector('.effect-level');
var levelLine = levelEffect.querySelector('.effect-level__line');
var levelPin = levelEffect.querySelector('.effect-level__pin');
var levelDepth = levelEffect.querySelector('.effect-level__depth');

var addHidden = function () {
  levelEffect.classList.add('hidden');
};

var removeHidden = function () {
  levelEffect.classList.remove('hidden');
};

var removeFilters = function () {
  uploadPreview.classList.remove(styleEffect);
};


var styleEffect;
var getChangeEffects = function (value) {
  removeFilters(); // обнуляем эффект фильтра если есть
  if (value === DEFAULT_FILTER) { // Работает строго, если эффекта нет
    addHidden(); // если нет эффекта на кнопке, то  скрываем строку насыщенности
  } else { // если таргет? находится на эффекте
    levelPin.style.left = '100%'; // позиция бегунка
    levelDepth.style.width = '100%'; // заполнение строки насыщенности
    removeHidden(); // если переключается на эффект, то показываем строку насыщенности
    uploadPreview.classList.add('effects__preview--' + value); // собираем строку
    getLevelPin(styleEffect, 453);
  }

  styleEffect = ('effects__preview--' + value);

};

effectsList.addEventListener('change', function (evt) {
  getChangeEffects(evt.target.value);
});


// Открытие попапа и закрытие попапа по крестику и эскейпу
var overlayForm = document.querySelector('.img-upload__overlay');
var cancelForm = document.querySelector('.img-upload__cancel');
var uploadFile = document.querySelector('#upload-file');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  overlayForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  overlayForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadFile.addEventListener('change', function () {
  openPopup();

});

cancelForm.addEventListener('click', function () {
  closePopup();
});


// Масштабирование картинки

var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var controlValue = document.querySelector('.scale__control--value');

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

// Насыщенность в зависимости от бегунка.

var getLevelPin = function (effect, value) {

  switch (effect) {
    case 'chrome':
      uploadPreview.style.filter = 'grayscale(' + value + ')';
      break;

    case 'sepia':
      uploadPreview.style.filter = 'sepia(' + value + ')';
      break;

    case 'marvin':
      uploadPreview.style.filter = 'invert(' + value * 100 + '%)';
      break;

    case 'phobos':
      uploadPreview.style.filter = 'blur(' + value * 3 + 'px)';
      break;

    case 'heat':
      uploadPreview.style.filter = 'brightness(' + HEAT_MIN + (HEAT_MAX - HEAT_MIN) * value + ')';

  }
};

levelPin.addEventListener('mouseup', function () {
  var value = (levelPin.offsetLeft / levelLine.clientWidth).toFixed(2);
  getLevelPin(styleEffect, value);

});

// Создание пользователей, комментов, лайков.
var imageList = document.querySelector('.pictures');
var imageTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getRandomNumber = function (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};

var getRandomElement = function (data) {
  return (data[getRandomNumber(0, data.length - 1)]);
};

var getComments = function (number) {
  var comments = [];
  for (var i = 0; i < number; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumber(AMOUNT_AVATARS_MIN, AMOUNT_AVATARS_MAX) + '.svg',
      message: getRandomElement(COMMENTS),
      name: getRandomElement(NAMES)
    });
  }
  return comments;
};


var getImages = function (number) {
  var images = [];
  for (var i = 0; i < number; i++) {
    images.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX),
      comments: getComments(getRandomNumber(COMMENTS_MIN, COMMENTS_MAX))
    });
  }
  return images;
};


var renderImage = function (image) {
  var imageElement = imageTemplate.cloneNode(true);

  imageElement.querySelector('.picture__img').src = image.url;
  imageElement.querySelector('.picture__likes').textContent = image.likes;
  imageElement.querySelector('.picture__comments').textContent = image.comments.length;
  return imageElement;
};

var images = getImages(AMOUNT_IMAGES_MAX);

var renderImages = function (imagesData) {
  var fragmentElement = document.createDocumentFragment();
  for (var i = 0; i < imagesData.length; i++) {
    fragmentElement.appendChild(renderImage(images[i]));
  }

  imageList.appendChild(fragmentElement);

};

renderImages(images);



