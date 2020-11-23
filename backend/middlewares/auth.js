const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, 'some-secret-key');
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }

  req.user = payload;

  return next();
};
