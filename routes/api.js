const express = require('express');
const router = express.Router();
const url = require('url');
const Game = require('../tictactoe');
const DB=require('../DB'); 

let game;
let games = {};


router.get('/newGame',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	var newId=DB.nextId();
	if(games[newId]==undefined) {
		games[newId] = new Game();
		DB.gameNew(newId);
	}
	res.end(JSON.stringify(newId));
})

router.get('/gameIds',(req,res)=>{
	
	if(DB.gameIds(req.query.id)){
		res.writeHead(200,{
			'Content-Type':'application/json'
		})
		res.end(JSON.stringify('ok'));
	}
	else{
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify('Game Not Found'));
	}	

})

router.get('/loadGame', (req,res) => {
	// DB.exists (game id)
	// res with error
	// games <- game id
	// games [id] = DB.load(game id)
	if(DB.exists(req.query.id)){
		if(!games[req.query.id]){
			games[req.query.id] = DB.load(req.query.id)
		}
		res.end('ok'); 
	}else{
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});
		res.end((JSON.stringify('Game Not Found')));
	}
});
// router.get('/rematch',(req,res) => {
// 	if(games[req.query.id]!=undefined){
// 		games[req.query.id]=undefined;
// 	}
// 	res.end('ok');
// })

// scoreboard
router.get('/scoreBoard',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(DB.winners()));

})
router.get('/state',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	DB.postState(req.query.id,games[req.query.id].getBoard());
	res.end((JSON.stringify(DB.getState(req.query.id))));
});

router.get('/whosturn',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	DB.whosTurn(req.query.id,games[req.query.id].playTurn());
	res.end(JSON.stringify(DB.turn(req.query.id)));
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
	res.writeHead(200,{
		'Content-Type':'application/json'
	});
	DB.checkWinner(req.query.id,games[req.query.id].getWinner());
	res.end(JSON.stringify(DB.winner(req.query.id)));
});


//POST /move
//GET /state
//GET /turn
//POST /newgame

module.exports = router;
