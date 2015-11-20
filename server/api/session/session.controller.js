'use strict';

var _ = require('lodash');

// Get user session
exports.getUserSession = function(req, res) {
  return res.status(200).json(req.session.user);
};

// Get location session for oauth redirect
exports.getRedirectSession = function(req, res) {
  return res.status(200).json(req.session.locationQuery);
};

function handleError(res, err) {
  return res.status(500).send(err);
}