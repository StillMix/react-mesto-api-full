/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link:
  {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
