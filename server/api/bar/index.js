'use strict';

var express = require('express');
var controller = require('./bar.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:userId', controller.showByUserId);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/barId/:id', controller.destroy);
router.delete('/barId/:barId/userId/:userId/', controller.destroyByBarIdAndUserId);

module.exports = router;