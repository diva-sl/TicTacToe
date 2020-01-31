let player;
let state;

function load(p) {
  player = p;
  initBoard(); 
  getGame()
    .then(pull);
}

function getGame() {
  return fetch('/api/newgame');
}

function initBoard() {
  const gameBoard = document.getElementById("board");
  const size = 3;

  for (var y = 0; y < size; y++) {
    const tr = document.createElement('tr');
    for (var x = 0; x < size; x++) {
      const td = document.createElement('td');
      td.setAttribute('class', 'td');
      td.setAttribute('id', x + ',' + y);
      td.setAttribute('onclick', 'place(' + x + ',' + y + ')');
      tr.appendChild(td);
    }
    gameBoard.appendChild(tr);
  }
}

function render() {
  if(state == undefined) {
    return ;
  }
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        var element = document.getElementById(i + ',' + j);
      if (state[i][j] != "-") {
        element.innerHTML = state[i][j];
      }else if(state[i][j]=='-') {
        element.innerHTML=null;
      }
    }
  }
}

function getState() {
  return fetch('/api/state')
    .then(res=> res.json())
    .then(res=> {
      state = res;
    });
}

function pull() {
  setInterval(()=> {
    getState()
      .then(render)
      .then(whosTurn)
      .then(checkWinner)
      // .then(showMenu)
  }, 3000);
}

function place(x, y) {
  fetch('/api/place', {
    method: 'POST',
    body: JSON.stringify([x,y]),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res=>{
    return res.json();
    })
  .then(err=>{
    if(err!='ok'){
    document.getElementById("msgs").innerHTML=err
    }else{
    document.getElementById("msgs").innerHTML=null
    } 
  })
}

function whosTurn() {
  fetch('/api/whosturn')
  .then(res=> res.json())
  .then(player=> {
    document.getElementById("currentPlayer").innerHTML = player;
  });
}

function checkWinner() {
  fetch('/api/winner')
  .then(res=> res.json())
  .then(winner=> {
    if (winner != undefined) {
      document.getElementById("winner").innerHTML = winner === '-' 
        ? 'Match Draw'
        : `Player ${winner} won the match`;
    }
  });
};

function reload(){
    
    return fetch('/api/rematch');
}

function restart() {
  reload();
  getGame()
  .then(pull)
}
