'use strict';

var _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;
var Bar = require('./bar.model');

// Get list of bars
exports.index = function(req, res) {
  Bar.find(function (err, bars) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bars);
  });
};

// Get a single bar
exports.show = function(req, res) {
  Bar.findById(req.params.id, function (err, bar) {
    if(err) { return handleError(res, err); }
    if(!bar) { return res.status(404).send('Not Found'); }
    return res.json(bar);
  });
};

// Get a bar list by user id
exports.showByUserId = function(req, res) {
  Bar.find({"user_id" : ObjectId(req.params.userId)}, function (err, bars) {
    if(err) { return handleError(res, err); }
    return res.json(bars);
  });
};

// Creates a new bar in the DB.
exports.create = function(req, res) {
  Bar.create(req.body, function(err, bar) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bar);
  });
};

// Updates an existing bar in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bar.findById(req.params.id, function (err, bar) {
    if (err) { return handleError(res, err); }
    if(!bar) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bar, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bar);
    });
  });
};

// Deletes a bar from the DB.
exports.destroy = function(req, res) {
  Bar.findById(req.params.id, function (err, bar) {
    if(err) { return handleError(res, err); }
    if(!bar) { return res.status(404).send('Not Found'); }
    bar.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}