'use strict';

var uploadForm = document.querySelector('#upload-select-image');
var uploadField = uploadForm.querySelector('#upload-file');
var filterFormContainer = document.querySelector('.upload-overlay');
var closeFilterForm = filterFormContainer.querySelector('.upload-form-cancel');
var mainPhoto = filterFormContainer.querySelector('.filter-image-preview');
var flag;

var changeForms = function () {
  if (flag) {
    uploadForm.classList.remove('invisible');
    filterFormContainer.classList.add('invisible');
    flag = false;
  } else {
    uploadForm.classList.add('invisible');
    filterFormContainer.classList.remove('invisible');
    flag = true;
  }
};

var toggleFilter = function () {
  var elems = document.getElementsByName('upload-filter');

  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];

    elem.addEventListener('click', function (event) {
      var name = event.target.id.substring(7);

      mainPhoto.classList = '';
      mainPhoto.classList.add(name);
    });
  }
};

var resizePhoto = function () {
  var dec = filterFormContainer.querySelector('.upload-resize-controls-button-dec');
  var inc = filterFormContainer.querySelector('.upload-resize-controls-button-inc');
  var resizeField = filterFormContainer.querySelector('.upload-resize-controls-value');
  var resizeVal = resizeField.value;

  var changeVal = function () {
    var min = 25;
    var max = 100;
    var step = 25;

    resizeVal = resizeVal.substring(0, resizeVal.length - 1);

    if (event.target === dec) {
      resizeVal = +resizeVal - step;

      if (resizeVal < min) {
        resizeVal = min;
      }

    } else if (event.target === inc) {
      resizeVal = +resizeVal + step;

      if (resizeVal > max) {
        resizeVal = max;
      }
    }

    if (resizeVal === max) {
      mainPhoto.style.transform = 'scale(1)';
    } else {
      mainPhoto.style.transform = 'scale(0.' + resizeVal + ')';
    }

    resizeVal += '%';
    resizeField.value = resizeVal;

  };

  dec.addEventListener('click', changeVal);
  inc.addEventListener('click', changeVal);
};

uploadField.addEventListener('change', changeForms);
closeFilterForm.addEventListener('click', changeForms);

toggleFilter();
resizePhoto();
