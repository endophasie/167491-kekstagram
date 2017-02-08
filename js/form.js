'use strict';

var uploadForm = document.querySelector('#upload-select-image');
var uploadField = uploadForm.querySelector('#upload-file');
var filterFormContainer = document.querySelector('.upload-overlay');
var closeFilterForm = filterFormContainer.querySelector('.upload-form-cancel');
var mainPhoto = filterFormContainer.querySelector('.filter-image-preview');
var isFilterFormOpened;

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

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

var initFilterHandlers = function () {
  var formControls = filterFormContainer.querySelector('.upload-filter-controls');

  var setMainPhotoFilter = function (name) {
    name = name.replace('upload-', '');

    mainPhoto.classList = '';
    mainPhoto.classList.add('filter-image-preview', name);
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

  filterFormContainer.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case ESCAPE_KEY :
        changeForms();
    }
  });
};

var initPhotoControls = function () {
  var dec = filterFormContainer.querySelector('.upload-resize-controls-button-dec');
  var inc = filterFormContainer.querySelector('.upload-resize-controls-button-inc');
  var resizeField = filterFormContainer.querySelector('.upload-resize-controls-value');
  var resizeVal = resizeField.value;

  var changeVal = function () {
    var min = 25;
    var max = 100;
    var step = 25;

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

uploadField.addEventListener('change', changeForms);
closeFilterForm.addEventListener('click', changeForms);


initFilterHandlers();
initPhotoControls();
