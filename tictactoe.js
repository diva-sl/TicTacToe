

function Game() {
  var count = {
    'A': 0,
    'B': 0
  }
  var box = 0;
  var turn = "A";
  var board = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      board.push(i + ',' + j);
    }
  }
  var result = [];
  for (var i = 0; i < 3; i++) {
    result[i] = [];   
    for (var j = 0; j < 3; j++) {
      result[i][j] = '-';
    }
  } 
  return {
    playTurn: function() {
      return turn;
    },
    moves: function(arr) {
      var k = 0;
      if(result[arr[0][0]][arr[0][1]]!='-'){
        return false;
      }
      else if(result[arr[0][0]][arr[0][1]]=='-'){
       if (arr[0].length == 2) {
        arr[0].push(turn);
        count[turn] += 1;
        for (var i = 0; i < arr.length; i++) {
          result[arr[i][0]][arr[i][1]] = arr[i][2];
        }
      }else if (arr[0].length == 3) {
        for (var i = 0; i < arr.length; i++) {
          result[arr[i][1]][arr[i][0]] = arr[i][2];
        }
      }
    }
    turn = turn === "A" ? "B" : "A";
    return true;
  },
  isEmpty: function(x, y) {
    if (result[x][y] == '-') {
      return true;
    }
  },

  getBoard: function() {
    return result;
  },
  getState: function() {
    var exp = result;
    var str;
    for (var i = 0; i < exp.length; i++) {
      if (str != undefined) {
        str += '\n' + exp[i].join('');
      } else {
        str = exp[i].join('');
      }
    }
    return str;
  },
  load: function(string) {
    var arr1 = [];
    var str1 = string.replace(/\s+/g, '\n').split('\n');
    for (var i = 0; i < str1.length; i++) {
      arr1[i] = []
      arr1[i][0] = str1[i][0]
      arr1[i][1] = str1[i][1]
      arr1[i][2] = str1[i][2]
      count[arr1[i][0]] += 1;
      count[arr1[i][1]] += 1;
      count[arr1[i][2]] += 1;

    }
    result = arr1;

  },
  check: function(arr) {
    if (board.indexOf(arr.toString()) != -1) {
      board[board.indexOf(arr.toString())] = arr;
      return arr;
    } else {
      return
    }
  },
  isOver: function() {
    var total = count["A"] + count["B"];
    var win = result;
    var winner;
    for (var i = 0; i < win.length; i++) {
      if ((win[i][0] == 'A') && (win[i][1] == 'A') && (win[i][2] == 'A')) {
        winner = 'A';
      } else if ((win[i][0] == 'B') && (win[i][1] == 'B') && (win[i][2] == 'B')) {
        winner = 'B';
      } else if ((win[0][i] == 'A') && (win[1][i] == 'A') && (win[2][i] == 'A')) {
        winner = 'A';
      } else if ((win[0][i] == 'B') && (win[1][i] == 'B') && (win[2][i] == 'B')) {
        winner = 'B';
      } else if (i == 0) {
        if ((win[i][0] == 'A') && (win[i + 1][1] == 'A') && (win[i + 2][2] == 'A')) {
          winner = 'A';
        } else if ((win[i][0] == 'B') && (win[i + 1][1] == 'B') && (win[i + 2][2] == 'B')) {
          winner = 'B'
        } else if ((win[2][i] == 'A') && (win[1][i + 1] == 'A') && (win[i][2] == 'A')) {
          winner = 'A';
        } else if ((win[2][i] == 'B') && (win[1][i + 1] == 'B') && (win[i][2] == 'B')) {
          winner = 'B'
        }
      }
    }
    if (winner == undefined && total == 9) {
      return true;
    } else if (winner == undefined && total < 9) {
      return false;
    } else if (winner == 'A' || 'B') {
      return true;
    }
  },
  getWinner: function() {
    var total = count["A"] + count["B"];
    var win = result;
    var winner;
    if (winner == undefined && total <= 9) {
      for (var i = 0; i < win.length; i++) {
        if ((win[i][0] == 'A') && (win[i][1] == 'A') && (win[i][2] == 'A')) {
          return winner = 'A';
        } else if ((win[i][0] == 'B') && (win[i][1] == 'B') && (win[i][2] == 'B')) {
          return winner = 'B';
        } else if ((win[0][i] == 'A') && (win[1][i] == 'A') && (win[2][i] == 'A')) {
          return winner = 'A';
        } else if ((win[0][i] == 'B') && (win[1][i] == 'B') && (win[2][i] == 'B')) {
          return winner = 'B';
        } else if (i == 0) {
          if ((win[i][0] == 'A') && (win[i + 1][1] == 'A') && (win[i + 2][2] == 'A')) {
            return winner = 'A';
          } else if ((win[i][0] == 'B') && (win[i + 1][1] == 'B') && (win[i + 2][2] == 'B')) {
            return winner = 'B'
          } else if ((win[2][i] == 'A') && (win[1][i + 1] == 'A') && (win[i][2] == 'A')) {
            return winner = 'A';
          } else if ((win[2][i] == 'B') && (win[1][i + 1] == 'B') && (win[i][2] == 'B')) {
            return winner = 'B'
          }else if(total==9){
            return winner = "-";
          }
        }
      }
    }

  },
  playCount: function() {
    if (count[turn] == 5) {
      return true;
    }
  }
}
}

module.exports = Game;
