/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Bar = require('../api/bar/bar.model');
var User = require('../api/user/user.model');
var ObjectId = require('mongoose').Types.ObjectId;

// Add user
Bar.find({}).remove(function() {
  User.create({
    _id : ObjectId("5648ecd690bed8850efe92a9"), 
    twitter : { 
      displayName : "Vladimir Efros",
      username : "VEfros",
      token : "4149842657-mdxHAc4GMYTJu6XoUJEoznauvz9bpFpivfdqmYf",
      id : "4149842657" 
    }
  })
});

// Add bars
Bar.find({}).remove(function() {
  Bar.create({
    user_id: ObjectId("5648ecd690bed8850efe92a9"),
    bar_id: "oxcart-tavern-brooklyn",
    active: true
  },{
    user_id: ObjectId("5648ecd690bed8850efe92a8"),
    bar_id: "oxcart-tavern-brooklyn",
    active: true
  },{
    user_id: ObjectId("564be9ef4e479e7726c99ca6"),
    bar_id: "oxcart-tavern-brooklyn",
    active: true
  },{
    user_id: ObjectId("5648ecd690bed8850efe92a9"),
    bar_id: "bordeaux-midwood",
    active: true
  },{
    user_id: ObjectId("5648ecd690bed8850efe92a8"),
    bar_id: "bordeaux-midwood",
    active: true
  },{
    user_id: ObjectId("564be9ef4e479e7726c99ca6"),
    bar_id: "bordeaux-midwood",
    active: true
  },{
    user_id: ObjectId("5648ecd690bed8850efe92a9"),
    bar_id: "sycamore-brooklyn-2",
    active: true
  },{
    user_id: ObjectId("5648ecd690bed8850efe92a8"),
    bar_id: "sycamore-brooklyn-2",
    active: true
  },{
    user_id: ObjectId("564be9ef4e479e7726c99ca6"),
    bar_id: "sycamore-brooklyn-2",
    active: true
  });
});