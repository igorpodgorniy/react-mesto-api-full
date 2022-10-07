const mongoose = require('mongoose');
const regExp = require('../constants/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    pattern: regExp,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    autopopulate: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
    autopopulate: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('card', cardSchema);
