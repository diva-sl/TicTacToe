var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/game', function(req, res, next) {
    
	 res.render('game', {player:req.query.player, id: req.query.id});
});

router.get('/newGame', function(req, res, next) {
	 res.render('newGame');
});

module.exports = router;
 