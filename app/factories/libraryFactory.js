angular.module('library')
  .factory('libraryFactory', ['pointCalculatorFactory',
    function(pointCalculatorFactory) {
      var library = [],
        libraryHash,
        libFactory = {};

      library = [
        'apple', 'pear', 'giraffe', 'dinner',
        'breakfast', 'lunch', 'swan', 'black'
      ];

      function getLibraryInHash() {
        if (!libraryHash) {
          libraryHash = [];
          library.forEach(function(entry) {
            libraryHash[entry] = pointCalculatorFactory.calculate(entry);
          })
        }

        return libraryHash;
        s
      }

      libFactory.library = getLibraryInHash();

      return libFactory;
    }
  ]);
