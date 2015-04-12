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
