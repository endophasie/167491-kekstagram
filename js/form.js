'use strict';

(function () {
  var scaleElement = document.querySelector('.upload-resize-controls');
  var mainPhoto = document.querySelector('.filter-image-preview');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadField = uploadForm.querySelector('#upload-file');
  var filterFormContainer = document.querySelector('.upload-overlay');
  var closeFilterForm = filterFormContainer.querySelector('.upload-form-cancel');
  var isFilterFormOpened;

  var ESCAPE_KEY = 27;
  var SCALE_STEP = 25;
  var INITIAL_SCALE = 100;
  var DEFAULT_SATURATION = 100;

  var adjustScale = function (scale) {
    mainPhoto.style.transform = 'scale(' + scale / 100 + ')';
  };

  var applyFilter = function (oldFilter, newFilter) {
    mainPhoto.classList.remove(oldFilter);
    mainPhoto.classList.add(newFilter);
  };

  var saturatePic = function (val) {
    if (val === 'underfined') {
      val = DEFAULT_SATURATION;
    }

    mainPhoto.style.filter = 'saturate(' + val / 100 + ')';
  };

  var changeForms = function () {
    if (isFilterFormOpened) {
      uploadForm.classList.remove('invisible');
      filterFormContainer.classList.add('invisible');

      isFilterFormOpened = false;
    } else {
      uploadForm.classList.add('invisible');
      filterFormContainer.classList.remove('invisible');

      isFilterFormOpened = true;
    }
  };

  uploadField.addEventListener('change', changeForms);
  closeFilterForm.addEventListener('click', changeForms);

  filterFormContainer.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case ESCAPE_KEY :
        changeForms();
    }
  });

  window.initializeFilters(applyFilter, saturatePic);
  window.initializeScale(scaleElement, SCALE_STEP, INITIAL_SCALE, adjustScale);
})();
