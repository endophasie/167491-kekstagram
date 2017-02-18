'use strict';

window.initializeFilters = (function () {
  var formControls = document.querySelector('.upload-filter-controls');

  var ENTER_KEY = 13;

  var setMainPhotoFilter = function (name) {
    var mainPhotoFilter = document.querySelector('.filter-image-preview');

    name = name.replace('upload-', '');

    mainPhotoFilter.classList = '';
    mainPhotoFilter.classList.add('filter-image-preview', name);
  };

  formControls.addEventListener('click', function (event) {
    if (event.target.getAttribute('name', 'upload-filter')) {
      var radioName = event.target.id;

      setMainPhotoFilter(radioName);
    }
  }, true);

  formControls.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case ENTER_KEY :
        var filterName = event.target.getAttribute('for');
        var radioFilter = formControls.querySelector('#' + filterName);

        radioFilter.setAttribute('checked', true);
        setMainPhotoFilter(filterName);
    }
  }, true);
})();
