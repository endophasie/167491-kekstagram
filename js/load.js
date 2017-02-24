'use strict';

window.load = (function () {
  var errorHandler = function (err) {
    throw new ReadError(err);
  };

  return function (url, callback, onError) {
    var xhr = new XMLHttpRequest();

    if (typeof onError === 'function') {
      errorHandler = onError;
    }

    xhr.addEventListener('load', function (event) {
      if (event.target.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + event.target.status);
      } else if (event.target.status >= 200) {
        callback(event.target.response);
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
