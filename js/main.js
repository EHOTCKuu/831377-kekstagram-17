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
var EFFECTS = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
var FILTERS = [' none', ' grayscale(0..1)', ' sepia(0..1)', ' invert(0..100%)', ' blur(0..3px)', ' filter: brightness(1..3)'];
var SCALE_STEP = 25;
var SCALE = 100;

// привязываем эффект к Radiobutton
var uploadPreview = document.querySelector('.img-upload__preview');
var radiobuttonEffects = document.querySelectorAll('.effects__radio');

var clickHandler = function (effect, color, filters) {
  effect.addEventListener('click', function () {
    uploadPreview.classList = ['img-upload__preview'];
    if (filters !== ' none') {
      uploadPreview.classList.add(color);
      uploadPreview.style.filter = filters;
    }
  });
};

for (var effect = 0; effect < radiobuttonEffects.length; effect++) {
  clickHandler(radiobuttonEffects[effect], EFFECTS[effect], FILTERS[effect]);
}

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

var getchangeScale = function (step, value) {
  var i = step + value;
  if (i >= 25 && i <= 100) {
    return i;
  }
  return step;
};

var getControl = function (scale, steps) {
  scale.addEventListener('click', function () {
    SCALE = getchangeScale(SCALE, steps);
    controlValue.value = SCALE + '%';
    var scaleInfo = 'transform: SCALE(' + SCALE / 100 + ')';
    uploadPreview.style = scaleInfo;
  });
};
getControl(controlSmaller, -(SCALE_STEP));
getControl(controlBigger, SCALE_STEP);

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
