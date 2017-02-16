window.initializeScale = function (container, step, defaultVal) {
  var dec = container.querySelector('.upload-resize-controls-button-dec');
  var inc = container.querySelector('.upload-resize-controls-button-inc');
  var resizeField = container.querySelector('.upload-resize-controls-value');
  var resizeVal = defaultVal + '%';

  var changeVal = function () {
    var min = 25;
    var max = 100;

    if (typeof (resizeVal) === 'string') {
      resizeVal = resizeVal.substring(0, resizeVal.length - 1);
    }

    if (event.target === dec) {
      resizeVal = Number(resizeVal) - step;
      if (resizeVal < min) {
        resizeVal = min;
      }

    } else if (event.target === inc) {
      resizeVal = Number(resizeVal) + step;

      if (resizeVal > max) {
        resizeVal = max;
      }
    }

    if (resizeVal === max) {
      mainPhoto.style.transform = 'scale(1)';
    } else {
      mainPhoto.style.transform = 'scale(0.' + resizeVal + ')';
    }

    resizeField.value = resizeVal + '%';
  };

  dec.addEventListener('click', changeVal);
  inc.addEventListener('click', changeVal);
};
