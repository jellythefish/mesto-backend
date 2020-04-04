const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
