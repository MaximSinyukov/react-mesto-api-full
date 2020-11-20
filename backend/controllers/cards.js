const Card = require('../models/card');

const getAllCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Произошла ошибка запроса.' });
    }
    return res.status(500).send({ message: 'Мы уже работаем над этим.' });
  });

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Мы уже работаем над этим.' });
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Карточка с таким id не найдена.' });
    }
    return res.status(500).send({ message: 'Мы уже работаем над этим.' });
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
