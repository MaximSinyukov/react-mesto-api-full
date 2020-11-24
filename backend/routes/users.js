const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, patchUser, patchUserAvatar,
} = require('../controllers/users');

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), patchUserAvatar);

router.get('/users/me', getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

module.exports = {
  router,
};
