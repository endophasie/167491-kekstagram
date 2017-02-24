'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];

  var ENTER_KEY = 13;

  var onLoadFilters = function (data) {
    pictures = data;
    showFilters();
    renderPictures(pictures);
  };

  var showFilters = function () {
    var blockFilters = document.querySelector('.filters');

    blockFilters.classList.remove('hidden');

    blockFilters.addEventListener('click', function (event) {
      switch (event.target.id) {
        case 'filter-popular' :
          renderPictures(pictures);
          break;
        case 'filter-new' :
          var newPictures = pictures.slice().sort(window.arrayUtils.shuffle).slice(0, 11);
          renderPictures(newPictures);
          break;
        case 'filter-discussed' :
          var discussedPictures = pictures.slice().sort(window.arrayUtils.sortCommentsDec);
          renderPictures(discussedPictures);
          break;
      }
    }, true);
  };

  var renderPictures = function (sortedPictures) {
    var blockPictures = document.querySelector('.pictures');
    var tmplPicture = document.querySelector('#picture-template');
    var contentPicture = tmplPicture.content.querySelector('.picture');

    blockPictures.innerHTML = '';

    sortedPictures.forEach(function (picture) {
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

  window.load(DATA_URL, onLoadFilters);

})();
