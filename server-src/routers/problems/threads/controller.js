// - controller
const errorBuilder = require('../../../modules/error-builder');
const models = require('../../../models');

exports.getCount = async (req, res) => {
  const numberOfThread = await models.thread.count();
  const numberOfPages = Math.ceil(numberOfThread / 25);

  res.json({ numberOfPages, numberOfThread });
};

exports.getList = async (req, res) => {
  const id = req.preParams.problemId;
  let pageIndex = 1;
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }

  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const s = await models.submit.findOne({
    where: {  solve_flag: 1, problem_id: id, user_id: req.decoded.id },
  });
  if (!s) {
    throw errorBuilder('NotSolved', 403, true);
  }

  const threads = await models.thread.findAll({
    offset: (pageIndex - 1) * 25,
    limit: 25,
    where: { problem_id: id },
    include: [{
      model: models.user,
      attributes: models.projection.user.thread,
    }],
    order: ['created_at'],
  });
  console.log(id);
  res.json({ threads });
};
