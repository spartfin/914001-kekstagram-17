'use strict';

(function () {
  window.utils = {
    compareRandom: function () {
      return Math.random() - 0.5;
    },

    compareNumbers: function (left, right) {
      if (left > right) {
        return -1;
      } if (left < right) {
        return 1;
      }
      return 0;
    },

    getRandomValue: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);

      return Math.floor(rand);
    },
  };

})();


