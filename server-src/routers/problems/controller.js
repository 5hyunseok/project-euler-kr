// - controller
const errorBuilder = require('../../modules/error-builder');
const config = require('../../config');
const models = require('../../models');

exports.getCount = async (req, res) => {
  const numberOfProblem = await models.problem.count();
  const numberOfPages = Math.ceil(numberOfProblem / config.problemPageSize)

  res.json({ numberOfPages });
};

exports.getList = async (req, res) => {
  let pageIndex = 0;
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }

  const problems = await models.problem.findAll({
    offset: pageIndex * config.problemPageSize,
    limit: config.problemPageSize,
    attributes: models.projection.problem.list,
  });

  res.json({ problems });
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

};
