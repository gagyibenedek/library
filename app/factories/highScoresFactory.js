angular.module('library')
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
