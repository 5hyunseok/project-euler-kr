const errorBuilder = require('../modules/error-builder');
const models = require('../models');

module.exports = async (req, res, next) => {
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }
  const s = await models.submit.findOne({
    where: {  solve_flag: 1, problem_id: req.preParams.problemId, user_id: req.decoded.id },
  });
  if (!s) {
    throw errorBuilder('NotSolved', 403, true);
  }
  next();
};
