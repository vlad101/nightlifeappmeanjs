'use strict';

var _ = require('lodash');
var Yelp = require('./yelp.model');

// Get list of yelps
exports.index = function(req, res) {
  Yelp.find(function (err, yelps) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(yelps);
  });
};

// Get a single yelp
exports.show = function(req, res) {
  Yelp.findById(req.params.id, function (err, yelp) {
    if(err) { return handleError(res, err); }
    if(!yelp) { return res.status(404).send('Not Found'); }
    return res.json(yelp);
  });
};

// Creates a new yelp in the DB.
exports.create = function(req, res) {
  Yelp.create(req.body, function(err, yelp) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(yelp);
  });
};

// Updates an existing yelp in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Yelp.findById(req.params.id, function (err, yelp) {
    if (err) { return handleError(res, err); }
    if(!yelp) { return res.status(404).send('Not Found'); }
    var updated = _.merge(yelp, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(yelp);
    });
  });
};

// Deletes a yelp from the DB.
exports.destroy = function(req, res) {
  Yelp.findById(req.params.id, function (err, yelp) {
    if(err) { return handleError(res, err); }
    if(!yelp) { return res.status(404).send('Not Found'); }
    yelp.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}