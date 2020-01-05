var express = require('express');
var router = express.Router();
var Game = require('../tictactoe');

var game ;

router.get('/newgame', (req,res) => {
	if(game==undefined) {
		game = new Game();
	}
	res.end('ok');
});

router.get('/state',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(game.getBoard()));
});

router.get('/whosturn',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(game.playTurn()));
});

router.post('/place',(req,res)=>{
	game.moves([req.body]);
	res.end('ok');
});

router.get('/winner',(req,res)=>{
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(game.getWinner()));
});

//POST /move
//GET /state
//GET /turn
//POST /newgame

module.exports = router;
