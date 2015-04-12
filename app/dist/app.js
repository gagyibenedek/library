var app = angular.module('library', []);

app.controller('MainController', ['$scope', 'libraryFactory', 'highScoresFactory',
  function($scope, libraryFactory, highScoresFactory) {
    var library = libraryFactory.library;

    $scope.word = '';
    $scope.message = '';
    $scope.points = 0;
    $scope.place = '0';

    $scope.highScores = highScoresFactory.getHighScores();
    $scope.highScoresDisplayed = false;

    $scope.submitWord = function() {
      if (library[$scope.word] === undefined) {
        $scope.message = 'not-found';
      } else {
        $scope.points = library[$scope.word];
        if (highScoresFactory.highScoreContainsWord($scope.word)) {
          $scope.message = 'found';
        } else {
          $scope.message = 'high-score';
          $scope.place = '1st';
          $scope.place = placeStringGenerator(highScoresFactory
            .addWord($scope.word, library[$scope.word]) + 1); //0 based index + 1
        }
      }
      clear();

      $scope.highScores = highScoresFactory.getHighScores();
    }

    $scope.toggleHighScores = function(){
      $scope.highScoresDisplayed = !$scope.highScoresDisplayed;
    }

    function placeStringGenerator(place) {
      var suffix, lastDigit = place.toString();
      lastDigit = lastDigit[lastDigit.length - 1];
      switch (lastDigit) {
        case '1':
          suffix = 'st';
          break;
        case '2':
          suffix = 'nd';
          break;
        case '3':
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
      }

      return place + suffix;
    }

    function clear() {
      $scope.word = '';
    }
  }
]);
;angular.module('library')
  .factory('highScoresFactory',
    function() {
      var hsf = {},
        head;

      //returns the position where the insertion was made, just like Array.push
      function insertNode(text, data) {
        var before,
          position = 0;
        if (!head) {
          //the list is empty
          head = createNode(text, data, null);
        } else if (!head.next) {
          //the list has only one element
          if (head.data > data) {
            head.next = createNode(data, null);
            position++;
          } else {
            head = createNode(text, data, head);
          }
        } else {
          //general case
          before = head;
          //it's ordered in a descending order
          while (before.next && before.next.data > data) {
            before = before.next;
            position++;
          }
          before.next = createNode(text, data, before.next);
          position++;
        }

        return position;
      }

      function createNode(text, data, next) {
        return {
          text: text,
          data: data,
          next: next
        }
      }

      hsf.getHighScores = function() {
        var scores = [],
          cursor = head;

        if (head) {
          scores.push({
            word: cursor.text,
            score: cursor.data
          });
          while (cursor.next) {
            cursor = cursor.next;
            scores.push({
              word: cursor.text,
              score: cursor.data
            });
          }
        }

        return scores;
      }

      hsf.highScoreContainsWord = function(word) {
        var cursor = head;
        if (cursor) {
          if (cursor.text === word) {
            return true;
          } else {
            while (cursor.next) {
              if (cursor.text === word) {
                return true;
              } else {
                cursor = cursor.next;
              }
            }
          }
        }

        return false;
      };

      hsf.addWord = insertNode;

      return hsf;
    }
  );
;angular.module('library')
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
;angular.module('library')
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
