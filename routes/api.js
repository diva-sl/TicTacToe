var express = require('express');
var router = express.Router();
const url = require('url');
var Game = require('../tictactoe');
    
let gameid;

let enterIds=[];
	 

let gameWinner=[];
let valid=1001;

function createUrl() {
	var urlArr=[]; 
	var play="B";
	const path={
		protocol: 'http',
		hostname: 'localhost',
		port:3000,
		pathname: '/game',
		query: {
			player: play==="A" ? "B" : "A",
			id: valid++
		}
	}
	for(var j=0;j<2;j++){
		urlArr.push(url.format(path));
		path.query.player=play;
	}
	enterIds.push(path.query.id);
	return urlArr;
}

var id;
var game;
var games = {};


router.get('/start',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(createUrl()));
})

router.get('/gameIds',(req,res)=>{
    res.writeHead(200,{
		'Content-Type':'application/json'
	})
	console.log(enterIds);
	res.end(JSON.stringify(enterIds));
})

router.get('/newgame', (req,res) => {
		if(games[req.query.id]==undefined) {
		games[req.query.id] = new Game();
   }
	res.end('ok'); 
});
router.get('/rematch',(req,res) => {
	if(games[req.query.id]!=undefined){
		games[req.query.id]=undefined;
	}
	res.end('ok');
})

router.get('/winners',(req,res)=>{
res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(gameWinner));

})
router.get('/state',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(games[req.query.id].getBoard()));
});

router.get('/whosturn',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(games[req.query.id].playTurn()));
});

router.post('/place',(req,res)=> {
	if(games[req.query.id].moves([req.body])) {
		res.writeHead(200,{
			'Content-Type':'application/json'
		});
		res.end(JSON.stringify('ok'));
		return;
	}
	res.writeHead(500, {
		'Content-Type': 'application/json'
	});
	res.end((JSON.stringify('Already taken')));
});

router.get('/exits',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})

	res.end(JSON.stringify(games[req.query.id].moves([req.body])));
})

router.get('/winner',(req,res)=>{
    let win={}
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	if(games[req.query.id].getWinner()!=undefined){
       if(gameid != req.query.id){
        win.id=req.query.id;
        gameid=req.query.id;
	    win.player=games[req.query.id].getWinner();
        gameWinner.push(win);
     }
    }
	res.end(JSON.stringify(games[req.query.id].getWinner()));
});

//POST /move
//GET /state
//GET /turn
//POST /newgame

module.exports = router;
