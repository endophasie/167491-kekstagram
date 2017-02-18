'use strict';

window.initializeScale = (function (container, step, defaultVal) {
  var mainPhoto = document.querySelector('.filter-image-preview');
  var dec = container.querySelector('.upload-resize-controls-button-dec');
  var inc = container.querySelector('.upload-resize-controls-button-inc');
  var resizeField = container.querySelector('.upload-resize-controls-value');

  var changeVal = function () {
    var min = 25;
    var max = 100;

    if (event.target === dec) {
      defaultVal = defaultVal - step;
      if (defaultVal < min) {
        defaultVal = min;
      }

    } else if (event.target === inc) {
      defaultVal = defaultVal + step;

      if (defaultVal > max) {
        defaultVal = max;
      }
    }

    if (defaultVal === max) {
      mainPhoto.style.transform = 'scale(1)';
    } else {
      mainPhoto.style.transform = 'scale(0.' + defaultVal + ')';
    }

    resizeField.value = defaultVal + '%';
  };

  dec.addEventListener('click', changeVal);
  inc.addEventListener('click', changeVal);
})(document.querySelector('.upload-resize-controls'), 25, 100);
