'use strict';

window.initializeScale = (function () {
  return function (container, step, defaultVal, scaleFunction) {
    var dec = container.querySelector('.upload-resize-controls-button-dec');
    var inc = container.querySelector('.upload-resize-controls-button-inc');
    var resizeField = container.querySelector('.upload-resize-controls-value');
    var currentVal;

    scaleFunction(defaultVal);
    resizeField.value = defaultVal + '%';
    currentVal = defaultVal;

    var changeVal = function () {
      var min = 25;
      var max = 100;

      if (event.target === dec) {
        currentVal = currentVal - step;
        if (currentVal < min) {
          currentVal = min;
        }
      } else if (event.target === inc) {
        currentVal = currentVal + step;

        if (currentVal > max) {
          currentVal = max;
        }
      }

      scaleFunction(currentVal);
      resizeField.value = currentVal + '%';
    };

    dec.addEventListener('click', changeVal);
    inc.addEventListener('click', changeVal);
  };
})();
