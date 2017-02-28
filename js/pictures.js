'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];
  var tmplPicture = document.querySelector('#picture-template');
  var contentPicture = tmplPicture.content.querySelector('.picture');

  var ENTER_KEY = 13;

  var onLoadPictures = function (data) {
    pictures = data;
    showFilters();
    loadrenderPicture(pictures);
  };

  var loadrenderPicture = function (arrayPic) {
    var blockPictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    blockPictures.innerHTML = '';

    arrayPic.forEach(function (it) {
      fragment.appendChild(renderPicture(it));
    });

    blockPictures.appendChild(fragment);
  };

  var showFilters = function () {
    var blockFilters = document.querySelector('.filters');

    blockFilters.classList.remove('hidden');

    blockFilters.addEventListener('click', function (event) {
      switch (event.target.id) {
        case 'filter-popular' :
          loadrenderPicture(pictures);
          break;
        case 'filter-new' :
          var newPictures = pictures.slice().sort(window.arrayUtils.shuffle).slice(0, 11);

          loadrenderPicture(newPictures);
          break;
        case 'filter-discussed' :
          var discussedPictures = pictures.slice().sort(window.arrayUtils.sortCommentsDec);

          loadrenderPicture(discussedPictures);
          break;
      }
    }, true);
  };

  var renderPicture = function (picture) {
    var elementPicture = contentPicture.cloneNode(true);
    var pictureImg = elementPicture.children[0];
    var pictureLikes = elementPicture.querySelector('.picture-likes');
    var picturesComments = elementPicture.querySelector('.picture-comments');

    pictureImg.setAttribute('src', picture.url);
    pictureLikes.innerText = picture.likes;
    picturesComments.innerText = picture.comments.length;

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

    return elementPicture;
  };

  window.load(DATA_URL, onLoadPictures);

})();
