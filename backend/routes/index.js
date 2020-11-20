const router = require('express').Router();

const usersRouter = require('./users').router;
const cardsRouter = require('./cards').router;
const otherRouter = require('./other').router;

router.use(
  usersRouter,
  cardsRouter,
  otherRouter,
);

module.exports = {
  router,
};
