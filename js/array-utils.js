'use strict';

window.arrayUtils = (function () {
  var shuffle = function () {
    return Math.random() - 0.5;
  };

  var sortCommentsDec = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  return {
    shuffle: shuffle,
    sortCommentsDec: sortCommentsDec
  };
})();
