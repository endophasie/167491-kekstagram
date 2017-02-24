'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (event) {
      if (event.target.status >= 200) {
        onLoad(event.target.response);
      }
    });

    xhr.responseType = 'json';

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
