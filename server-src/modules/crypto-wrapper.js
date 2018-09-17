const crypto = require('crypto');
const config = require('../config');

exports.sha256Hex = original =>
  crypto.createHmac('sha256', config.shaKey)
    .update(original)
    .digest('hex');
