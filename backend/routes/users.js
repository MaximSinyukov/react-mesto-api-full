const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, patchUser, patchUserAvatar, logout,
} = require('../controllers/users');

router.patch('/users/me/avatar', celebrate({
  headers: Joi.object().keys({
    'Content-Type': Joi.string().required(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), patchUserAvatar);

router.get('/users/me', getUserById);

router.patch('/users/me', celebrate({
  headers: Joi.object().keys({
    'Content-Type': Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

router.get('/sign-out', logout);

module.exports = {
  router,
};
