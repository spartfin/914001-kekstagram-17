'use strict';

(function () {
  var COMMENTS_COUNT = 4;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var pictureCancel = bigPicture.querySelector('#picture-cancel');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');

  var commentsInfo = function () {
    commentsLoader.classList.add('visually-hidden');
    socialCommentCount.classList.add('visually-hidden');
  };

  var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList = className;
    return element;
  };

  var createComments = function (commentsArr) {
    var socialComments = bigPicture.querySelector('.social__comments');
    socialComments.innerHTML = '';
    for (var i = 0; i < commentsArr.length; i++) {
      var commentMessage = createElement('li', 'social__comment');
      var commentAvatar = createElement('img', 'social__picture');
      commentAvatar.src = commentsArr[i].avatar;
      commentAvatar.alt = 'Аватар комментатора фотографии';
      commentAvatar.width = 35;
      commentMessage.appendChild(commentAvatar);
      commentMessage.appendChild(document.createTextNode(commentsArr[i].message));

      socialComments.appendChild(commentMessage);
      if (i > COMMENTS_COUNT) {
        commentMessage.style.display = 'none';
      }
    }
  };

  commentsLoader.addEventListener('click', function () {
    var socialComment = bigPicture.querySelectorAll('.social__comment');
    var startComment = 0;
    for (var i = 0; i < socialComment.length; i++) {
      if (socialComment[i].style.display === 'none') {
        socialComment[i].style.display = '';
        startComment++;
        if (startComment > COMMENTS_COUNT) {
          break;
        }
      }
    }
    addCommentsInfo();
  });

  var addCommentsInfo = function () {
    var commentItems = bigPicture.querySelectorAll('.social__comment');
    var count = 0;
    commentItems.forEach(function (item) {
      if (item.style.display !== 'none') {
        count++;
      }
    });
    socialCommentCount.childNodes[0].data = count + ' из ';
    if (count === commentItems.length) {
      commentsInfo();
    }
  };

  // функция показа полноразмерного режима
  var showBigPictureImg = function (currentPictureObj) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = currentPictureObj.url;
    bigPicture.querySelector('.big-picture__img img').alt = currentPictureObj.description;
    bigPicture.querySelector('.likes-count').textContent = currentPictureObj.likes;
    bigPictureSocial.querySelector('.social__caption').textContent = currentPictureObj.description;
    bigPictureSocial.querySelector('.comments-count').textContent = currentPictureObj.comments.length;
    createComments(currentPictureObj.comments);
  };
  window.showBigPictureImg = showBigPictureImg;


  // функция закрытия полноразмерного режима
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  // закрываем по клику полноразмерный режим
  pictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  // закрываем по кнопке ESC полноразмерный режим
  window.containerPicture.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeBigPicture();
    }
  });

})();

