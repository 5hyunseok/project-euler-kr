const jwt = require('jsonwebtoken');
const config = require('../config');
const errorBuilder = require('../modules/error-builder');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const authVar = {};
  if (!token) {
    req.hasToken = false; // eslint-disable-line
    next();
    return;
  }
  req.hasToken = true; // eslint-disable-line

  jwt.verify(token, config.shaKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        next(errorBuilder('Expired', 401, true));
        return;
      }
      next(errorBuilder('TokenError', 401, true));
      return;
    }
    req.decoded = decoded; // eslint-disable-line
    req.authVar = authVar; // eslint-disable-line
    next();
  });
};
