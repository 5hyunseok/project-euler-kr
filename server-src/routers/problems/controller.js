// - controller
const moment = require('moment');
const { Op } = require('sequelize');
const errorBuilder = require('../../modules/error-builder');
const config = require('../../config');
const models = require('../../models');

exports.getCount = async (req, res) => {
  const numberOfProblem = await models.problem.count();
  const numberOfPages = Math.ceil(numberOfProblem / config.problemPageSize);

  res.json({ numberOfPages });
};

exports.getList = async (req, res) => {
  let pageIndex = 1;
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }

  let problems;
  if (req.hasToken) {
    problems = await models.problem.findAll({
      offset: (pageIndex - 1) * config.problemPageSize,
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
      offset: (pageIndex - 1) * config.problemPageSize,
      limit: config.problemPageSize,
      attributes: models.projection.problem.list,
      order: ['id'],
    });
  }

  res.json({ login: req.hasToken, problems });
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

  let submitAnswer = '';
  let solve = false;
  let pending = false;

  const problem = await models.problem.findById(id, {
    attributes: models.projection.problem.one,
  });
  const answer = await models.answer.findById(id);

  if (!problem) {
    throw errorBuilder('NotFound', 404, true);
  }

  if (req.hasToken) {
    const solveChecking = await models.submit.findOne({
      where: { solve_flag: 1, user_id: req.decoded.id, problem_id: id },
    });
    if (solveChecking) {
      submitAnswer = solveChecking.answer;
      solve = true;
    }

    const pendingChecking = await models.submit.findOne({
      where: { pending_flag: 1, user_id: req.decoded.id, problem_id: id },
    });
    if (pendingChecking) {
      pending = true;
    }
  }

  res.json({
    login: req.hasToken,
    problem,
    pending,
    solve,
    answer: submitAnswer,
    hasAnswer: !!answer,
    hasKorean: !(problem.title_kr === ''),
  });
};

exports.submit = async (req, res) => {
  const id = req.params.id;
  let submitAnswer = req.body.answer;

  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const problem = await models.problem.findById(id, {
    attributes: models.projection.problem.one,
  });
  if (!problem) {
    throw errorBuilder('NotFound', 404, true);
  }

  const solveChecking = await models.submit.findOne({
    where: { solve_flag: 1, user_id: req.decoded.id, problem_id: id },
  });
  if (solveChecking) {
    throw errorBuilder('Solved', 412, true);
  }
  const pendingChecking = await models.submit.findOne({
    where: { pending_flag: 1, user_id: req.decoded.id, problem_id: id },
  });
  if (pendingChecking) {
    throw errorBuilder('Pending', 412, true);
  }

  const within30Seconds = await models.submit.findAll({
    where: {
      created_at: {
        [Op.gt]: moment().subtract(30, 'seconds').toDate(),
      },
      user_id: req.decoded.id,
      problem_id: id,
    },
  });
  if (within30Seconds.length > 0) {
    throw errorBuilder('Within30Seconds', 412, true);
  }

  if (!/^[0-9]{1,30}$/.test(submitAnswer)) {
    res.json({ pending: false, isCorrect: false });
    return;
  }
  submitAnswer = parseInt(submitAnswer, 10);

  const answer = await models.answer.findById(id);

  let isCorrect = false;
  let pending = false;

  if (answer) { // 답이 있을 때
    if (answer.answer === submitAnswer) {
      isCorrect = true;
    }
  } else { // 답이 없을 때
    pending = true;
  }
  await models.submit.create({
    answer: submitAnswer,
    solve_flag: isCorrect ? 1 : 0,
    pending_flag: pending ? 1 : 0,
    problem_id: id,
    user_id: req.decoded.id,
  });

  res.json({ pending, isCorrect });
};

exports.recent = async (req, res) => {
  let problems;
  if (req.hasToken) {
    problems = await models.problem.findAll({
      limit: 10,
      attributes: models.projection.problem.list,
      include: [{
        model: models.submit,
        attributes: ['solve_flag'],
        where: { solve_flag: 1, user_id: req.decoded.id },
        required: false,
      }],
      order: [['id', 'DESC']],
    });
  } else {
    problems = await models.problem.findAll({
      limit: 10,
      attributes: models.projection.problem.list,
      order: [['id', 'DESC']],
    });
  }

  res.json({ login: req.hasToken, problems });
};

exports.translate = async (req, res) => {
  const id = req.params.id;
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
