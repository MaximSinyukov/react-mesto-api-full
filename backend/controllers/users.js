const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

const logout = (req, res) => {
  res
    .cookie('jwt', 'emptyCookie', {
      maxAge: 1,
      httpOnly: true,
    })
    .end();
};

const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(new NotFoundError('Пользователь с таким id не найден.'));
    });
};

const patchUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(new NotFoundError('Пользователь с таким id не найден.'));
    });
};

const getUserById = (req, res, next) => User.findById(req.user._id)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь с таким id не найден.'));
    }
    next(err);
  });

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      const {
        email, password, name, about, avatar,
      } = req.body;
      return User.create({
        email, password, name, about, avatar,
      })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports = {
  login,
  logout,
  patchUser,
  patchUserAvatar,
  getUserById,
  createUser,
};
