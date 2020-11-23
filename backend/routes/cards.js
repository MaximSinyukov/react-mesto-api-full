const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCard, createLikeCard, deleteLikeCard,
} = require('../controllers/cards');

router.put('/cards/likes/:id', celebrate({
  headers: Joi.object().keys({
    'Content-Type': Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), createLikeCard);

router.delete('/cards/likes/:id', celebrate({
  headers: Joi.object().keys({
    'Content-Type': Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteLikeCard);

router.delete('/cards/:id', celebrate({
  headers: Joi.object().keys({
    'Content-Type': Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

router.get('/cards', getAllCards);

router.post('/cards', celebrate({
  headers: Joi.object().keys({
    'Content-Type': Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

module.exports = {
  router,
};
