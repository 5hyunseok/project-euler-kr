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

  const { title, problem, comment } = req.body;

  await models.translateSubmit.create({
    comment,
    title_kr: title,
    problem_kr: problem,
    user_id: req.decoded.id,
    problem_id: id,
  });

  res.json({ success: true });
};

exports.getCount = async (req, res) => {
  const numberOfTranslate = await models.translateSubmit.count();
  const numberOfPages = Math.ceil(numberOfTranslate / 25);

  res.json({ numberOfPages, numberOfTranslate });
};

exports.getList = async (req, res) => {
  const id = req.preParams.problemId;
  let pageIndex = 1;
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }

  const translates = await models.translateSubmit.findAll({
    offset: (pageIndex - 1) * 20,
    limit: 20,
    where: { problem_id: id },
    include: [{
      model: models.user,
      attributes: models.projection.user.thread,
    }],
    order: ['created_at'],
  });
  res.json({ translates });
};

exports.delete = async (req, res) => {
  const tid = req.params.tid;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const translate = await models.translateSubmit.findById(tid);
  if (!translate) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (translate.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }

  await translate.destroy();

  res.json({ success: true });
};

exports.update = async (req, res) => {
  const tid = req.params.tid;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const translate = await models.translateSubmit.findById(tid);
  if (!translate) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (translate.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }
  const { title, problem, comment } = req.body;

  translate.title_kr = title;
  translate.problem_kr = problem;
  translate.comment = comment;
  await translate.save();

  res.json({ success: true });
};

