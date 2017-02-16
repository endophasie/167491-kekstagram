'use strict';

var uploadForm = document.querySelector('#upload-select-image');
var uploadField = uploadForm.querySelector('#upload-file');
var filterFormContainer = document.querySelector('.upload-overlay');
var scaleContainer = document.querySelector('.upload-resize-controls');
var closeFilterForm = filterFormContainer.querySelector('.upload-form-cancel');
var isFilterFormOpened;

var ESCAPE_KEY = 27;

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

window.initializeFilters();

window.initializeScale(scaleContainer, 25, 100);
