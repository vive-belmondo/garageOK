'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mark Schema
 */
var MarkSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  markName: {
    type: String,
    default: '',
    trim: true,
    required: 'Marque cannot be blank'
  },
  
 
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Mark', MarkSchema);
