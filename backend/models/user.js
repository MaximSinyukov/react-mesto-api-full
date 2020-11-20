const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
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
});

module.exports = mongoose.model('user', userSchema);
