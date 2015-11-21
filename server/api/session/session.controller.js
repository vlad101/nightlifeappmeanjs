'use strict';

var _ = require('lodash');

// Get user session
exports.getUserSession = function(req, res) {
  return res.status(200).json(req.session.user);
};

// Set location query on auth twitter login
exports.setRedirectSession = function(req, res) {
  // Store redirect location query
  req.session.locationQuery = req.params.redirectLocationQuery;
  return res.status(200).json(req.session.locationQuery);
};

// Get location session for oauth redirect and clear location session on return
exports.getRedirectSession = function(req, res) {

  // Store redirect location query
  var redirectLocationQuery = req.session.locationQuery;

  // Clear session location query
  req.session.locationQuery = '';

  // Return stored redirection query
  return res.status(200).json(redirectLocationQuery);
};

function handleError(res, err) {
  return res.status(500).send(err);
}