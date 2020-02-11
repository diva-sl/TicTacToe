let player;
let state;
let gameid;
let gameIds=[];

let interval; 


function newGame() {
  fetch('/api/newGame')
  .then(res=> res.json())
  .then(urlId=> {
    document.getElementById("link1").innerHTML ='<a target=_blank rel=noopener noreferrer href=http://localhost:3000/game?player=A&id='+urlId+'>'+'http://localhost:3000/game?player=A&id='+urlId+'</a>'
    document.getElementById("link2").innerHTML ='<a target=_blank rel=noopener noreferrer href=http://localhost:3000/game?player=B&id='+urlId+'>'+'http://localhost:3000/game?player=B&id='+urlId+'</a>'
  })
}


function paint(){
  const tbody = document.getElementById("games");
  fetch('/api/scoreBoard')
  .then(res=> res.json())
  .then(x=> {
    x.forEach(obj=>{
      const row=document.createElement("tr");
      const winId = document.createElement('td');
      const winPlayer=document.createElement('td');
      winId.innerText=obj.id;
      if(obj.player=="-"){
      winPlayer.innerText="Match Draw";  
      }else{
      winPlayer.innerText=obj.player;
    }
      row.appendChild(winId);
      row.appendChild(winPlayer);
      tbody.appendChild(row);
    })
  });
}

function load(p,id) {
  player = p;
  gameid=id;
  var check;
 fetch('/api/gameIds?id='+gameid)
  .then(res=> res.json())
  .then(err=>{
   if(err =='ok'){
   document.getElementById("gameWin").innerHTML='<a target=_blank rel=noopener noreferrer href=http://localhost:3000/games >WINNERS DETAILS</a>'
   initBoard();
   getGame()
   .then(pull);
     }
  else{
       document.getElementById("error").innerText=err;
       document.getElementById("gameWin").innerHTML='<a href=http://localhost:3000/newGame>NEW GAME</a>'
       document.getElementById("container").style.display="none";
     }
  })
}

function getGame() {
  return fetch('/api/loadGame?id='+gameid);
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
  return fetch('/api/state?id='+gameid)
  .then(res=> res.json())
  .then(res=> {
    state = res;
  });
}

function pull() {
  interval=setInterval(()=> {
    getState()
    .then(render)
    .then(whosTurn)
    .then(checkWinner)
    .then(paint)
  }, 3000);
}

function place(x, y) {
  fetch('/api/place?id='+gameid, {
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
  fetch('/api/whosturn?id='+gameid)
  .then(res=> res.json())
  .then(player=> {
    if(document.getElementById("winner").innerHTML == ''){
      document.getElementById("currentPlayer").innerHTML = player;
    }else{
      document.getElementById("currentPlayer").innerHTML = null;
    }
  });
}

function checkWinner() {
  fetch('/api/winner?id='+gameid)
  .then(res=> res.json())
  .then(winner=> {
    if (winner != undefined) {
      document.getElementById("winner").innerHTML = winner === '-' 
      ? 'Match Draw'
      : `Player ${winner} won the match`;
      document.getElementById("currentPlayer").innerHTML = null;
      clearInterval(interval);
    }
  });
};


function reload(){
  document.getElementById("winner").innerHTML = null; 
  return fetch('/api/rematch?id='+gameid);
}

function restart() {
  reload();
  getGame()
  .then(pull)
}

