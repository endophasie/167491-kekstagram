'use strict';

window.showGallery = (function () {
  var ESCAPE_KEY = 27;

  return function (data) {
    var gallery = document.querySelector('.gallery-overlay');
    var galleryClose = gallery.querySelector('.gallery-overlay-close');
    var galleryImg = gallery.querySelector('.gallery-overlay-image');
    var galleryLikes = gallery.querySelector('.likes-count');
    var galleryComments = gallery.querySelector('.comments-count');

    var onClose = function () {
      gallery.classList.add('invisible');
    };

    galleryImg.setAttribute('src', data.url);
    galleryLikes.innerText = data.likes;
    galleryComments.innerText = data.comments.length;

    gallery.classList.remove('invisible');

    galleryClose.addEventListener('click', onClose);
    gallery.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case ESCAPE_KEY :
          onClose();
      }
    });
  };
})();
