var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/game', function(req, res, next) {
  	 res.render('game', {player:req.query.player, id: req.query.id});
});

router.get('/newGame', function(req, res, next) {
	 res.render('newGame');
});

router.get('/games', function(req, res, next) {
	 res.render('games');
});
 



module.exports = router;
 