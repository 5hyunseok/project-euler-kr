// - controller
const errorBuilder = require('../../modules/error-builder');
const models = require('../../models');

exports.tokenValidation = async (req, res) => {
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  res.json({ success: true });
};
