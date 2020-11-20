const mongoose = require('mongoose');

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
    validate: {
      validator(value) {
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/(www\.)?[-0-9\/a-z()@:%.+~#=_]+\.{1}[a-z0-9]+\b[\/\/a-z0-9()@:%_+.~#?&=]*/mgi.test(value);
      },
      message: 'несуществующий адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
