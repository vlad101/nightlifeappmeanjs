'use strict';

var _ = require('lodash');

// Get list of sessions
exports.index = function(req, res) {
  return res.status(200).json(req.session.user);
};

function handleError(res, err) {
  return res.status(500).send(err);
}