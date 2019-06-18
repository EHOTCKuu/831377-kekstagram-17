'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артём', 'Игорь', 'Трололоша', 'Андрей', 'Константин', 'Василий', 'Саша', 'Ермолай', 'Гербарий'];
var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
var AMOUNT_LIKES_MIN = 15;
var AMOUNT_LIKES_MAX = 200;
var AMOUNT_IMG_MIN = 1;
var AMOUNT_IMG_MAX = 25;



var getRandomElement = function (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};

var likes = getRandomElement(AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX);
// eslint-disable-next-line no-console
console.log(likes);


// var url = 'photos/' + getRandomElement(AMOUNT_IMG_MIN, AMOUNT_IMG_MAX) + '.jpg';

// eslint-disable-next-line no-console
//console.log(url);

// Создание заготовки  комментов к фото.

var getDataElement = function (data) {
  return (data[Math.floor(Math.random() * data.length)]);
};

var getComments = function (number) {
  var comment = [];
  for (var i = 0; i < number; i++) {
    comment.push({
      avatar: getDataElement(AVATARS),
      message: getDataElement(COMMENTS),
      name: getDataElement(NAMES)
    });
  }
  return comment;
};

// eslint-disable-next-line no-console
console.log(getComments(3));
