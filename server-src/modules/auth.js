const jwt = require('jsonwebtoken');
const config = require('../config');

exports.sign = async user => new Promise((resolve, reject) => {
  jwt.sign(
    {
      id: user.id,
      uid: user.uid,
      type: user.type,
    },
    config.shaKey,
    {
      expiresIn: '14h',
      issuer: 'euler',
      subject: 'loginInfo',
    }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    },
  );
});
