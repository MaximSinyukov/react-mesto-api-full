const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'несуществующая почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
