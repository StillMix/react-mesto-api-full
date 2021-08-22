/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const mongoose = require('mongoose');
const validator = require('validator');

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
    validate: {
      validator: (ava) => validator.isURL(ava, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неверная ссылка',
    },
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
