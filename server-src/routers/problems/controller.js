// - controller
const moment = require('moment');
const { Op } = require('sequelize');
const errorBuilder = require('../../modules/error-builder');
const config = require('../../config');
const models = require('../../models');

exports.getCount = async (req, res) => {
  const numberOfProblem = await models.problem.count();
  const numberOfPages = Math.ceil(numberOfProblem / config.problemPageSize);

  res.json({ numberOfPages, numberOfProblem });
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
      }, {
        model: models.thread,
        attributes: ['id'],
      }],
      order: ['id'],
    });
  } else {
    problems = await models.problem.findAll({
      offset: (pageIndex - 1) * config.problemPageSize,
      limit: config.problemPageSize,
      attributes: models.projection.problem.list,
      order: ['id'],
      include: [{
        model: models.thread,
        attributes: ['id'],
        required: false,
      }]
    });
  }

  res.json({ login: req.hasToken, problems });
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

  let solve = false;
  let pending = false;
  let solveChecking;
  let pendingChecking;

  const problem = await models.problem.findById(id, {
    attributes: models.projection.problem.one,
  });
  const answer = await models.answer.findById(id);

  if (!problem) {
    throw errorBuilder('NotFound', 404, true);
  }

  if (req.hasToken) {
    solveChecking = await models.submit.findOne({
      where: { solve_flag: 1, user_id: req.decoded.id, problem_id: id },
      order: [['id', 'DESC']],
    });
    if (solveChecking) {
      solve = true;
    }

    pendingChecking = await models.submit.findOne({
      where: { pending_flag: 1, user_id: req.decoded.id, problem_id: id },
      order: [['id', 'DESC']],
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
    submitAnswer: solve ? solveChecking.answer : (pending ? pendingChecking.answer : ''),
    submitDate: solve ? solveChecking.created_at : (pending ? pendingChecking.created_at : null),
    hasAnswer: !!answer,
    hasKorean: !(problem.title_kr === '' || problem.title_kr === null),
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

  //TODO::
  // const within30Seconds = await models.submit.findAll({
  //   where: {
  //     created_at: {
  //       [Op.gt]: moment().subtract(30, 'seconds').toDate(),
  //     },
  //     user_id: req.decoded.id,
  //     problem_id: id,
  //   },
  // });
  // if (within30Seconds.length > 0) {
  //   throw errorBuilder('Within30Seconds', 412, true);
  // }

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

  if(isCorrect) {
    problem.solver += 1;
    problem.save();
  }
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

