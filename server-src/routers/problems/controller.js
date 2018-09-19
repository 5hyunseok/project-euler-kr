// - controller
const errorBuilder = require('../../modules/error-builder');
const config = require('../../config');
const models = require('../../models');

exports.getCount = async (req, res) => {
  const numberOfProblem = await models.problem.count();
  const numberOfPages = Math.ceil(numberOfProblem / config.problemPageSize);

  res.json({ numberOfPages });
};

exports.getList = async (req, res) => {
  let pageIndex = 0;
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }

  let problems;
  if (req.hasToken) {
    problems = await models.problem.findAll({
      offset: pageIndex * config.problemPageSize,
      limit: config.problemPageSize,
      attributes: models.projection.problem.list,
      include: [{
        model: models.submit,
        attributes: ['solve_flag'],
        where: { solve_flag: 1, user_id: req.decoded.id },
        required: false,
      }],
      order: ['id'],
    });
  } else {
    problems = await models.problem.findAll({
      offset: pageIndex * config.problemPageSize,
      limit: config.problemPageSize,
      attributes: models.projection.problem.list,
      order: ['id'],
    });
  }

  res.json({ login: req.hasToken, problems });
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

  let answer = '';
  let solve = false;

  if (req.hasToken) {
    const solveChecking = await models.submit.findOne({
      where: { solve_flag: 1, user_id: req.decoded.id, problem_id: id },
    });
    if (solveChecking.length > 0) {
      answer = solveChecking.answer;
      solve = true;
    }
  }

  const problem = await models.problem.findById(id, {
    attributes: models.projection.problem.one,
  });

  res.json({ login: req.hasToken, problem, solve, answer });
};
