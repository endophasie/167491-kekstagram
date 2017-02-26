'use strict';

(function () {
  var scaleElement = document.querySelector('.upload-resize-controls');
  var mainPhoto = document.querySelector('.filter-image-preview');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadField = uploadForm.querySelector('#upload-file');
  var filterFormContainer = document.querySelector('.upload-overlay');
  var closeFilterForm = filterFormContainer.querySelector('.upload-form-cancel');
  var isFilterFormOpened;
  var currentFilter = 'filter-none';

  var ESCAPE_KEY = 27;
  var SCALE_STEP = 25;
  var INITIAL_SCALE = 100;

  var adjustScale = function (scale) {
    mainPhoto.style.transform = 'scale(' + scale / 100 + ')';
  };

  var applyFilter = function (oldFilter, newFilter) {
    mainPhoto.classList.remove(oldFilter);
    mainPhoto.classList.add(newFilter);
    currentFilter = newFilter;
  };

  var filterLevelPhoto = function (filterVal) {
    switch (currentFilter) {
      case 'filter-chrome' :
        mainPhoto.style.filter = 'grayscale(' + (filterVal / 455).toFixed(2) + ')';
        break;
      case 'filter-sepia' :
        mainPhoto.style.filter = 'sepia(' + (filterVal / 455).toFixed(2) + ')';
        break;
      case 'filter-marvin' :
        mainPhoto.style.filter = 'invert(' + Math.floor(filterVal / 455 * 100) + '%)';
        break;
      case 'filter-phobos' :
        mainPhoto.style.filter = 'contrast(' + Math.max(1, filterVal / 100) + ')' + 'sepia(' + (filterVal / 455 * 0.3).toFixed(2) + ')';
        break;
      case 'filter-heat' :
        mainPhoto.style.filter = 'brightness(' + Math.max(1, filterVal / 100) + ')' + 'sepia(' + (filterVal / 455 * 0.5).toFixed(2) + ')';
        break;
      default :
        mainPhoto.style.filter = 'none';
    }
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

  window.initializeFilters(applyFilter, filterLevelPhoto);
  window.initializeScale(scaleElement, SCALE_STEP, INITIAL_SCALE, adjustScale);
})();
