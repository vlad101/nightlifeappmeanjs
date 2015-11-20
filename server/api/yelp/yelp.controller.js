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
exports.search = function(req, res, err) {
  
    //See http://www.yelp.com/developers/documentation/v2/search_api
    if(!req.params.locationQuery) { return handleError(res, err); }
    yelp.search({term: "bar", location: req.params.locationQuery}, function(error, data) {
      if(error) { return handleError(res, error); }

      // Save the search query to the session
      req.session.locationQuery = req.params.locationQuery;

      return res.status(200).json(data);
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}