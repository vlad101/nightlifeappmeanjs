'use strict';

var express = require('express');
var controller = require('./yelp.controller');

var router = express.Router();

router.get('/location/:locationQuery', controller.search);

module.exports = router;