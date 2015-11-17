'use strict';

var _ = require('lodash');
var Auth = require('./auth.model');

// Get list of auths
exports.index = function(req, res) {
  Auth.find(function (err, auths) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(auths);
  });
};

// Get a single auth
exports.show = function(req, res) {
  Auth.findById(req.params.id, function (err, auth) {
    if(err) { return handleError(res, err); }
    if(!auth) { return res.status(404).send('Not Found'); }
    return res.json(auth);
  });
};

// Creates a new auth in the DB.
exports.create = function(req, res) {
  Auth.create(req.body, function(err, auth) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(auth);
  });
};

// Updates an existing auth in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Auth.findById(req.params.id, function (err, auth) {
    if (err) { return handleError(res, err); }
    if(!auth) { return res.status(404).send('Not Found'); }
    var updated = _.merge(auth, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(auth);
    });
  });
};

// Deletes a auth from the DB.
exports.destroy = function(req, res) {
  Auth.findById(req.params.id, function (err, auth) {
    if(err) { return handleError(res, err); }
    if(!auth) { return res.status(404).send('Not Found'); }
    auth.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}