'use strict';

window.initializeFilters = (function () {
  var initializeFilters = function (setFilter, setSaturation) {
    var formControls = document.querySelector('.upload-filter-controls');
    var filterLevel = formControls.querySelector('.upload-filter-level');
    var filterLevelLine = filterLevel.querySelector('.upload-filter-level-line');
    var filterLevelPin = filterLevel.querySelector('.upload-filter-level-pin');
    var filterLevelVal = filterLevel.querySelector('.upload-filter-level-val');
    var oldFilter = 'filter-none';

    var ENTER_KEY = 13;

    var showFilterLevel = function (currentFilterName) {
      currentFilterName === 'filter-none' ? filterLevel.classList.add('invisible') : filterLevel.classList.remove('invisible');

      setSaturation();
    };

    showFilterLevel(oldFilter);

    formControls.addEventListener('click', function (event) {
      if (event.target.getAttribute('name', 'upload-filter')) {
        var radioName = event.target.id;
        radioName = radioName.replace('upload-', '');

        setFilter(oldFilter, radioName);
        showFilterLevel(radioName);
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
          showFilterLevel(filterName);
          oldFilter = filterName;
      }
    }, true);

    filterLevelPin.addEventListener('mousedown', function (event) {
      event.preventDefault();

      var startPoint = {
        x: Event.clientX
      };

      var onMouseMove = function (moveEvent) {
        moveEvent.preventDefault();

        var shift = {
          x: startPoint.x - moveEvent.clientX
        };

        var filterVal = filterLevelPin.offsetLeft - shift.x;

        filterLevelPin.style.left = Math.max(0, filterVal) && Math.min(filterLevelLine.clientWidth, filterVal) + 'px';
        filterLevelVal.style.width = filterLevelPin.style.left;

        setSaturation(filterVal);

        startPoint = {
          x: moveEvent.clientX
        };
      };

      var onMouseUp = function (upEvent) {
        upEvent.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  return initializeFilters;
})();
