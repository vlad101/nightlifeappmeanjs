'use strict';

var express = require('express');
var controller = require('./session.controller');

var router = express.Router();

router.get('/user', controller.getUserSession);
router.get('/redirect', controller.getRedirectSession);

module.exports = router;