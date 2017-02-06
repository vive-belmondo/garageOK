'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Xpr Schema
 */
var XprSchema = new Schema({

  fonction: {
    type: String,
    default: '',
    trim: true,
    required: 'fonction cannot be blank'
  },
  entreprise: {
    type: String,
    default: '',
    trim: true,
    required: 'entreprise cannot be blank'
  },
  activite: {
    type: String,
    default: '',
    trim: true,
    required: 'activite cannot be blank'
  },
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // }
});

mongoose.model('Xpr', XprSchema);
