'use strict';

var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);

var router = express.Router();

router.get('/', passport.authenticate('twitter', { scope : 'email' }));
router.get('/callback/', 
	passport.authenticate('twitter'), function(req, res) {
    	if(req.user) 
			req.session.user = req.user;
		res.redirect('/');
  }
);
router.get('/logout', function(req, res) {
  if(req.session.hasOwnProperty('user'))
  	delete req.session.user;
  req.logout();
  res.redirect('/');
});
module.exports = router;