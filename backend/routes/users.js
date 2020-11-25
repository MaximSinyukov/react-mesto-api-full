const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, patchUser, patchUserAvatar,
} = require('../controllers/users');

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(/https?:\/\/(www\.)?[-0-9/a-z()@:%.+~#=_]+\.{1}[a-z0-9]+\b[//a-z0-9()@:%_+.~#?&=]*/mi)),
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
