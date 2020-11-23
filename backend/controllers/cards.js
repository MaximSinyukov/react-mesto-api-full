const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

const getAllCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Произошла ошибка запроса.'));
    }
    next(err);
  });

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const createLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка с таким id не найдена.'));
      }
      next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка с таким id не найдена.'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (req.user._id !== card.owner) {
        throw new ForbiddenError('У Вас недостаточно прав для выполнения этой операции');
      }
      return Card.findByIdAndRemove(req.params.id)
        .then((removeCard) => res.status(200).send(removeCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка с таким id не найдена.'));
      }
      next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  createLikeCard,
  deleteLikeCard,
};
