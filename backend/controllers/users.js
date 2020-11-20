const User = require('../models/user');

const getAllUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Произошла ошибка запроса.' });
    }
    return res.status(500).send({ message: 'Мы уже работаем над этим.' });
  });

const getUserById = (req, res) => User.findById(req.params.id)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Пользователь с таким id не найден.' });
    }
    return res.status(500).send({ message: 'Мы уже работаем над этим.' });
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Мы уже работаем над этим.' });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
