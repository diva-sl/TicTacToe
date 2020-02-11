const fs=require('fs')
const Game = require('./tictactoe');

let gamesDb=JSON.parse(fs.readFileSync('./tmp/db.json').toString() || '{}');

gamesDb["id"]=gamesDb["id"] || 1001;
gamesDb["enterIds"]=gamesDb["enterIds"] || [];

const nextId=()=>{
	var nxt=gamesDb["id"];
	gamesDb["id"]=nxt+1;
	gamesDb["enterIds"].push(nxt);
	return nxt; 
}

const gameIds=(id)=>{
	return gamesDb["enterIds"].includes(JSON.parse(id));
}

const exists=(id)=>{
	return (gamesDb[id]!=undefined);

}

const load=(id)=>{
	var g=new Game();
	var set=gamesDb[id].state;
	for(var i=0;i<set.length;i++){
		for(var j=0;j<set.length;j++){
			if(set[i][j]!="-"){
				g.moves([[i,j,set[i][j]]]);
			}
		}
	}
	return g;
}


const gameNew=(reqId)=>{
	gamesDb[reqId]={};
}

const postState=(id,board)=>{
	console.log(board);
	gamesDb[id].state=board;
}

const getState=(id)=>{
	return gamesDb[id].state; 

}

const winners=()=>{
	var gameWinners=[];
	gamesDb["enterIds"].forEach(id=>{
		if(gamesDb[id].winner == "A" || "B"){
			var win={};
			win.id=id;
			win.player=gamesDb[id].winner;
			gameWinners.push(win)
		}
	})
	return gameWinners;
}

const whosTurn=(id,turn)=>{
	gamesDb[id].turn=turn;

}
const turn =(id)=>{
	return gamesDb[id].turn;
}

const checkWinner=(id,winner)=>{
	gamesDb[id].winner=winner;
}
const winner=(id)=>{
	return gamesDb[id].winner;
}

setInterval(()=>{
	fs.writeFileSync('./tmp/db.json',JSON.stringify(gamesDb,null,2));
}, 200);

module.exports={
	nextId,
	gameIds,
	gameNew,
	load,
	postState,
	getState,
	winners,
	whosTurn,
	turn,
	checkWinner,
	winner,
	exists			     
}