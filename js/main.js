'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артём', 'Игорь', 'Трололоша', 'Андрей', 'Константин', 'Василий', 'Саша', 'Ермолай', 'Гербарий'];
var AMOUNT_LIKES_MIN = 15;
var AMOUNT_LIKES_MAX = 200;
var AMOUNT_AVATARS_MAX = 6;
var AMOUNT_AVATARS_MIN = 1;
var AMOUNT_IMGS_MAX = 25;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 9;

var imageList = document.querySelector('.pictures');
var imageTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getRandomElement = function (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};


var getData = function (data) {
  return (data[Math.floor(Math.random() * data.length)]);
};

var getComments = function (number) {
  var comment = [];
  for (var i = 0; i < number; i++) {
    comment.push({
      avatar: 'img/avatar-' + getRandomElement(AMOUNT_AVATARS_MIN, AMOUNT_AVATARS_MAX) + '.svg',
      message: getData(COMMENTS),
      name: getData(NAMES)
    });
  }
  return comment;
};


var getImages = function (number) {
  var images = [];
  for (var i = 0; i < number; i++) {
    images.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomElement(AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX),
      comments: getComments(getRandomElement(COMMENTS_MIN, COMMENTS_MAX))
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

var image = getImages(AMOUNT_IMGS_MAX);

var renderImages = function (imagesData) {
  var fragmentElement = document.createDocumentFragment();
  for (var i = 0; i < imagesData.length; i++) {
    fragmentElement.appendChild(renderImage(image[i]));
  }

  imageList.appendChild(fragmentElement);

};

renderImages(image);
