'use strict';

var _ = require('lodash');

// load the auth variables
var configYelp = require('../../config/yelp');

var yelp = require("yelp").createClient({
  consumer_key        : configYelp.yelp.consumer_key, 
  consumer_secret     : configYelp.yelp.consumer_secret,
  token               : configYelp.yelp.token,
  token_secret        : configYelp.yelp.token_secret
});

// Get list of yelps
exports.index = function(req, res) {
    //See http://www.yelp.com/developers/documentation/v2/search_api
    if(!req.params.location) { return handleError(res, err); }
    yelp.search({term: "food", location: req.params.location}, function(error, data) {
      if(error) { return handleError(res, err); }
      return res.status(200).json(data);
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}