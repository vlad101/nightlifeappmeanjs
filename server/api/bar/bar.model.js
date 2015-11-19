'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BarSchema = new Schema({

  user_id: { type: Schema.Types.ObjectId},
  bar_id: {
            type: String,
            required: true
  },
  active: Boolean

});

module.exports = mongoose.model('Bar', BarSchema);