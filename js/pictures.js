'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];

  var ENTER_KEY = 13;

  var onLoad = function (data) {
    var blockPictures = document.querySelector('.pictures');
    var tmplPicture = document.querySelector('#picture-template');
    var contentPicture = tmplPicture.content.querySelector('.picture');

    pictures = data;

    pictures.forEach(function (picture) {
      var elementPicture = contentPicture.cloneNode(true);
      var pictureImg = elementPicture.children[0];
      var pictureLikes = elementPicture.querySelector('.picture-likes');
      var picturesComments = elementPicture.querySelector('.picture-comments');

      pictureImg.setAttribute('src', picture.url);
      pictureLikes.innerText = picture.likes;
      picturesComments.innerText = picture.comments.length;
      blockPictures.appendChild(elementPicture);

      elementPicture.addEventListener('click', function (event) {
        event.preventDefault();

        window.showGallery(picture);
      });
      elementPicture.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
          case ENTER_KEY :
            window.showGallery(picture);
        }
      });
    });
  };

  window.load(DATA_URL, onLoad);
})();
