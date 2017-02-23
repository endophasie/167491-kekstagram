'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];

  var ENTER_KEY = 13;

  var onLoad = function (sortedPictures) {
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

  var onLoadFilters = function (data) {
    var blockFilters = document.querySelector('.filters');

    function shuffle(a, b) {
      return Math.random() - 0.5;
    }

    function sortCommentsDec (a, b) {
      return b.comments.length - a.comments.length;
    }

    pictures = data;
    blockFilters.classList.remove('hidden');
    onLoad(pictures);

    blockFilters.addEventListener('click', function (event) {
      switch (event.target.id) {
        case 'filter-popular' :
          onLoad(pictures);
          break;
        case 'filter-new' :
          var newPictures = pictures.slice().sort(shuffle).slice(0, 11);
          onLoad(newPictures);
          break;
        case 'filter-discussed' :
          var discussedPictures = pictures.slice().sort(sortCommentsDec);
          onLoad(discussedPictures);
          break;
      }
    }, true);
  };

  window.load(DATA_URL, onLoadFilters);

})();
