const errorBuilder = require('../../../modules/error-builder');
const models = require('../../../models');

exports.translate = async (req, res) => {
  const id = req.preParams.problemId;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const theProblem = await models.problem.findById(id, {
    attributes: models.projection.problem.one,
  });
  if (!theProblem) {
    throw errorBuilder('NotFound', 404, true);
  }

  const { title, problem } = req.body;

  await models.translateSubmit.create({
    title_kr: title,
    problem_kr: problem,
    user_id: req.decoded.id,
    problem_id: id,
  });

  res.json({ success: true });
};
