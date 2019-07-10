'use strict';

(function () {
  window.utils = {
    compareRandom: function () {
      return Math.random() - 0.5;
    },

    compareNumbers: function (left, right) {
      if (left > right) {
        return -1;
      } else if (left < right) {
        return 1;
      } else {
        return 0;
      }
    }
  };

})();

