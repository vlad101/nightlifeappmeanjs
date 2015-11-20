'use strict';

var express = require('express');
var controller = require('./session.controller');

var router = express.Router();

router.get('/user', controller.getUserSession);
router.get('/setRedirect/:redirectLocationQuery', controller.setRedirectSession);
router.get('/getRedirect', controller.getRedirectSession);

module.exports = router;