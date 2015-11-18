'use strict';

var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);

var router = express.Router();

router.get('/', passport.authenticate('twitter', { scope : 'email' }));
router.get('/callback/', 
	passport.authenticate('twitter'
		),  function(req, res) {
    	if(req.user) {
    		req.session.user = req.user;
    	}
		res.redirect('/');
  }

	// , { successRedirect : '/' })
);

module.exports = router;