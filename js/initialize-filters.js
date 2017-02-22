'use strict';

window.initializeFilters = (function () {
  var initializeFilters = function (setFilter) {
    var formControls = document.querySelector('.upload-filter-controls');
    var oldFilter;

    var ENTER_KEY = 13;

    formControls.addEventListener('click', function (event) {
      if (event.target.getAttribute('name', 'upload-filter')) {
        var radioName = event.target.id;
        radioName = radioName.replace('upload-', '');

        setFilter(oldFilter, radioName);
        oldFilter = radioName;
      }
    }, true);

    formControls.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case ENTER_KEY :
          var filterName = event.target.getAttribute('for');
          var radioFilter = formControls.querySelector('#' + filterName);

          filterName = filterName.replace('upload-', '');
          radioFilter.setAttribute('checked', 'checked');
          setFilter(oldFilter, filterName);
          oldFilter = filterName;
      }
    }, true);
  };

  return initializeFilters;
})();
