require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'prodaction'
      ? JWT_SECRET
      : 'some-dev-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
