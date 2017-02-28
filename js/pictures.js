'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];

  var ENTER_KEY = 13;

  var onLoadPictures = function (data) {
    pictures = data;
    showFilters();
    loadRenderPictures();
  };

  var loadRenderPictures = function (arrayPic) {
    var blockPictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var arrayToRender = arrayPic || pictures;

    blockPictures.innerHTML = '';

    arrayToRender.forEach(function (it) {
      fragment.appendChild(renderPictures(it));
    });

    blockPictures.appendChild(fragment);
  };

  var showFilters = function () {
    var blockFilters = document.querySelector('.filters');

    blockFilters.classList.remove('hidden');

    blockFilters.addEventListener('click', function (event) {
      switch (event.target.id) {
        case 'filter-popular' :
          loadRenderPictures();
          break;
        case 'filter-new' :
          var newPictures = pictures.slice().sort(window.arrayUtils.shuffle).slice(0, 11);

          loadRenderPictures(newPictures);
          break;
        case 'filter-discussed' :
          var discussedPictures = pictures.slice().sort(window.arrayUtils.sortCommentsDec);

          loadRenderPictures(discussedPictures);
          break;
      }
    }, true);
  };

  var renderPictures = (function () {
    var tmplPicture = document.querySelector('#picture-template');
    var contentPicture = tmplPicture.content.querySelector('.picture');

    return function (picture) {
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
  })();

  window.load(DATA_URL, onLoadPictures);

})();
