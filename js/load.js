'use strict';

window.load = (function () {
  var errorHandler = function (err) {
    console.log(err);
  };

  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    if(typeof onError === 'function') {
      errorHandler = onError;
    }

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + evt.target.status);
      } else if (evt.target.status >= 200) {
        onLoad(evt.target.response);
      }
    });

    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.responseType = 'json';

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
