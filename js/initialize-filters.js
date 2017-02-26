'use strict';

window.initializeFilters = (function () {
  var initializeFilters = function (setFilter, setFilterLevel) {
    var formControls = document.querySelector('.upload-filter-controls');
    var filterLevel = formControls.querySelector('.upload-filter-level');
    var filterLevelLine = filterLevel.querySelector('.upload-filter-level-line');
    var filterLevelPin = filterLevel.querySelector('.upload-filter-level-pin');
    var filterLevelVal = filterLevel.querySelector('.upload-filter-level-val');
    var oldFilter = 'filter-none';
    var levelVal = 100;

    var ENTER_KEY = 13;

    var showFilterLevel = function (currentFilterName) {
      if (currentFilterName === 'filter-none') {
        filterLevel.classList.add('invisible');
      } else {
        filterLevel.classList.remove('invisible');
      }
    };

    showFilterLevel(oldFilter);

    formControls.addEventListener('click', function (event) {
      if (event.target.name === 'upload-filter') {
        var radioName = event.target.id;
        radioName = radioName.replace('upload-', '');

        setFilter(oldFilter, radioName);
        showFilterLevel(radioName);
        setFilterLevel(levelVal);
        oldFilter = radioName;
      }
    }, true);

    formControls.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case ENTER_KEY :
          var filterName = event.target.htmlFor;
          var radioFilter = formControls.querySelector('#' + filterName);

          filterName = filterName.replace('upload-', '');
          radioFilter.setAttribute('checked', 'checked');
          setFilter(oldFilter, filterName);
          showFilterLevel(filterName);
          setFilterLevel(levelVal);
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

        levelVal = filterLevelPin.offsetLeft - shift.x;

        filterLevelPin.style.left = Math.max(0, levelVal) && Math.min(filterLevelLine.clientWidth, levelVal) + 'px';
        filterLevelVal.style.width = filterLevelPin.style.left;

        setFilterLevel(levelVal);

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
