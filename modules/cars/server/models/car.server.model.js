'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Car Schema
 */
var CarSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  // marque: {
  //   type: String,
  //   default: '',
  //   trim: true,
  //   required: 'Marque cannot be blank'
  // },
  marque: {
    type: Schema.ObjectId,
    ref: 'Mark'
  },
  modele: {
    type: String,
    default: '',
    trim: true,
    required: 'Modele cannot be blank'
  },
  puissance: {
    type: Number,
    default: '',
    trim: true,
    required: 'Puissance cannot be blank'
  },
  energie: {
    type: String,
    default: '',
    trim: true,
    required: 'Energie cannot be blank'
  },
  prix: {
    type: Number,
    default: '',
    trim: true,
    required: 'Prix cannot be blank'
  },
   image: {
    type: String,
    default:'/test'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Car', CarSchema);
