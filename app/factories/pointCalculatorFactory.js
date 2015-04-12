angular.module('library')
  .factory('pointCalculatorFactory', function() {
    var pcf = {};

    pcf.calculate = function(word) {
      var count = 0,
        letterHash = [];
      if (word.length === 0) {
        return 0;
      }
      word.split('').forEach(function(letter) {
        if(!letterHash[letter]){
          letterHash[letter] = 1;
        } else {
          letterHash[letter]++;
        }
      });
      for(hash in letterHash){
        if(letterHash[hash] === 1){
          count++;
        }
      }

      return count;
    }

    return pcf;
  });
